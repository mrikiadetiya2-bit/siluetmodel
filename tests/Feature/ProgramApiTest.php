<?php

namespace Tests\Feature;

use App\Models\Program;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Participant;
use App\Models\Payment;
use App\Models\Mentor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class ProgramApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_update_and_delete_program_and_public_catalog_only_shows_active_programs(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['role' => 'admin'])->save();
        $this->actingAs($admin);
        $mentor = Mentor::create(['name' => 'Mentor Test', 'active' => true]);

        $payload = [
            'title' => 'Runway Intensive',
            'category' => 'Runway & Catwalk',
            'duration' => '12 Sesi',
            'price' => 4500000,
            'quota' => 20,
            'status' => 'Aktif',
            'syllabus' => ['Teknik runway'],
            'perks' => ['Sertifikat'],
            'mentor_id' => $mentor->id,
            'class_day' => 'Saturday',
            'first_class_date' => '2027-01-02',
            'class_start_time' => '09:00',
            'class_end_time' => '10:30',
            'meeting_count' => 3,
            'location' => 'Studio Utama',
        ];

        $this->post('/api/admin/programs', [...$payload, 'image' => UploadedFile::fake()->createWithContent('program.jpg', "\xFF\xD8\xFF\xD9")], ['Accept' => 'application/json'])
            ->assertCreated()
            ->assertJsonPath('title', 'Runway Intensive');

        $program = Program::firstOrFail();
        $this->assertDatabaseCount('class_schedules', 3);
        $this->assertDatabaseHas('class_schedules', ['program_id' => $program->id, 'starts_at' => '2027-01-02 09:00:00', 'location' => 'Studio Utama']);
        $this->assertDatabaseHas('class_schedules', ['program_id' => $program->id, 'starts_at' => '2027-01-16 09:00:00']);

        $this->getJson('/api/programs')->assertOk()->assertJsonCount(1);
        $this->getJson("/api/programs/{$program->id}")->assertOk()->assertJsonPath('id', $program->id);
        $updatedPayload = $payload;
        unset($updatedPayload['enrolled']);
        $this->putJson("/api/admin/programs/{$program->id}", [...$updatedPayload, 'status' => 'Draft'])
            ->assertOk()->assertJsonPath('status', 'Draft');
        $this->getJson('/api/programs')->assertOk()->assertJsonCount(0);
        $this->putJson("/api/admin/programs/{$program->id}", [...$payload, 'status' => 'Aktif'])->assertOk();
        $participant = User::factory()->create();
        $participant->forceFill(['role' => 'peserta'])->save();
        $participantRow = Participant::create(['user_id' => $participant->id]);
        Enrollment::create(['participant_id' => $participantRow->id, 'program_id' => $program->id, 'status' => 'pending']);
        $this->deleteJson("/api/admin/programs/{$program->id}")->assertOk()->assertJsonPath('program.status', 'Nonaktif');
        $this->assertDatabaseHas('programs', ['id' => $program->id, 'status' => 'Nonaktif']);
        $this->deleteJson("/api/admin/programs/{$program->id}")->assertStatus(409);
        $this->assertDatabaseHas('programs', ['id' => $program->id, 'status' => 'Nonaktif']);
    }

    public function test_overdue_first_class_date_moves_to_next_selected_weekday(): void
    {
        Carbon::setTestNow(Carbon::parse('2027-01-10 12:00:00'));
        try {
            $admin = User::factory()->create();
            $admin->forceFill(['role' => 'admin'])->save();
            $mentor = Mentor::create(['name' => 'Mentor Jadwal', 'active' => true]);

            $this->actingAs($admin)->post('/api/admin/programs', [
                'title' => 'Kelas Mingguan', 'category' => 'Basic Modeling', 'duration' => '3 Bulan',
                'price' => 1000000, 'quota' => 10, 'status' => 'Aktif', 'mentor_id' => $mentor->id,
                'class_day' => 'Saturday', 'first_class_date' => '2027-01-02', 'class_start_time' => '09:00',
                'class_end_time' => '10:00', 'meeting_count' => 2, 'location' => 'Studio',
                'image' => UploadedFile::fake()->createWithContent('program.jpg', "\xFF\xD8\xFF\xD9"),
            ], ['Accept' => 'application/json'])->assertCreated();

            $this->assertDatabaseHas('class_schedules', ['starts_at' => '2027-01-16 09:00:00']);
            $this->assertDatabaseHas('class_schedules', ['starts_at' => '2027-01-23 09:00:00']);
        } finally {
            Carbon::setTestNow();
        }
    }

    public function test_authenticated_participant_cannot_access_admin_api_or_admin_pages(): void
    {
        $participant = User::factory()->create();
        $participant->forceFill(['role' => 'peserta'])->save();

        $this->actingAs($participant)
            ->getJson('/api/admin/programs')
            ->assertForbidden();

        $this->get('/admin/dashboard')->assertForbidden();
    }

    public function test_guest_is_redirected_to_named_login_route_from_admin_page(): void
    {
        $this->get('/admin/dashboard')->assertRedirect('/login');
    }

    public function test_admin_and_member_login_endpoints_only_authenticate_matching_roles(): void
    {
        $admin = User::factory()->create(['email' => 'admin@example.test', 'password' => bcrypt('password')]);
        $admin->forceFill(['role' => 'admin'])->save();
        $member = User::factory()->create(['email' => 'member@example.test', 'password' => bcrypt('password')]);
        $member->forceFill(['role' => 'peserta'])->save();

        $this->postJson('/admin/login', ['email' => $member->email, 'password' => 'password'])->assertForbidden();
        $this->assertGuest();
        $this->postJson('/login', ['email' => $admin->email, 'password' => 'password'])->assertForbidden();
        $this->assertGuest();
        $this->postJson('/admin/login', ['email' => $admin->email, 'password' => 'password'])->assertOk()->assertJsonPath('role', 'admin');
        $this->assertAuthenticatedAs($admin);

        auth()->logout();
        $this->postJson('/login', ['email' => $member->email, 'password' => 'password'])->assertOk()->assertJsonPath('role', 'peserta');
        $this->assertAuthenticatedAs($member);
    }

    public function test_enrollment_is_authenticated_and_uses_program_price_creating_pending_payment(): void
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => 'peserta'])->save();
        $program = Program::create(['title' => 'Runway', 'category' => 'Runway', 'duration' => '8 sesi', 'price' => 6200000, 'quota' => 1, 'status' => 'Aktif']);

        $this->postJson('/api/enrollments', ['program_id' => $program->id])->assertUnauthorized();
        $this->actingAs($user)->postJson('/api/enrollments', ['program_id' => $program->id, 'amount' => 1])
            ->assertCreated()
            ->assertJsonPath('payment.amount', 6200000)
            ->assertJsonPath('payment.status', 'pending');

        $this->assertDatabaseCount('enrollments', 1);
        $this->assertDatabaseCount('payments', 1);
    }

    public function test_inactive_full_and_duplicate_enrollments_are_rejected(): void
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => 'peserta'])->save();
        $participant = Participant::create(['user_id' => $user->id]);
        $inactive = Program::create(['title' => 'Inactive', 'category' => 'X', 'duration' => '1', 'price' => 10, 'quota' => 1, 'status' => 'Draft']);
        $full = Program::create(['title' => 'Full', 'category' => 'X', 'duration' => '1', 'price' => 10, 'quota' => 1, 'status' => 'Aktif']);
        $existing = Program::create(['title' => 'Existing', 'category' => 'X', 'duration' => '1', 'price' => 10, 'quota' => 3, 'status' => 'Aktif']);
        $occupied = Enrollment::create(['participant_id' => $participant->id, 'program_id' => $full->id, 'status' => 'pending']);
        Payment::create(['enrollment_id' => $occupied->id, 'invoice' => 'FULL-1', 'amount' => 10]);
        $duplicate = Enrollment::create(['participant_id' => $participant->id, 'program_id' => $existing->id, 'status' => 'confirmed']);
        Payment::create(['enrollment_id' => $duplicate->id, 'invoice' => 'DUP-1', 'amount' => 10]);

        $this->actingAs($user)->postJson('/api/enrollments', ['program_id' => $inactive->id])->assertUnprocessable();
        $this->postJson('/api/enrollments', ['program_id' => $full->id])->assertUnprocessable();
        $this->postJson('/api/enrollments', ['program_id' => $existing->id])->assertUnprocessable();
        $this->assertDatabaseCount('enrollments', 2);
    }

    public function test_dashboard_is_role_gated_and_participant_only_sees_own_enrollments(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['role' => 'admin'])->save();
        $this->actingAs($admin)->getJson('/portal/dashboard')->assertOk()
            ->assertJsonPath('statistics.activePrograms', 0)
            ->assertJsonPath('statistics.successfulPayments', 0);
        $this->get('/admin/dashboard')->assertOk();

        $one = User::factory()->create();
        $one->forceFill(['role' => 'peserta'])->save();
        $two = User::factory()->create();
        $two->forceFill(['role' => 'peserta'])->save();
        $program = Program::create(['title' => 'P', 'category' => 'X', 'duration' => '1', 'price' => 100, 'quota' => 3, 'status' => 'Aktif']);
        $firstEnrollment = Enrollment::create(['participant_id' => Participant::create(['user_id' => $one->id])->id, 'program_id' => $program->id]);
        Payment::create(['enrollment_id' => $firstEnrollment->id, 'invoice' => 'OWN-1', 'amount' => 100]);
        $otherEnrollment = Enrollment::create(['participant_id' => Participant::create(['user_id' => $two->id])->id, 'program_id' => $program->id]);
        Payment::create(['enrollment_id' => $otherEnrollment->id, 'invoice' => 'OTHER-1', 'amount' => 100]);

        $response = $this->actingAs($one)->getJson('/portal/dashboard')->assertOk()->assertJsonCount(1, 'enrollments');
        $this->assertStringNotContainsString('OTHER-1', $response->getContent());
    }

    public function test_registration_rejects_privileged_role_assignment(): void
    {
        $this->postJson('/register', ['name' => 'Escalate', 'email' => 'esc@example.test', 'phone' => '123', 'password' => 'password', 'password_confirmation' => 'password', 'role' => 'admin']);
        $this->assertDatabaseMissing('users', ['email' => 'esc@example.test']);
    }

    public function test_payment_creation_failure_rolls_back_enrollment(): void
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => 'peserta'])->save();
        $program = Program::create(['title' => 'Runway', 'category' => 'Runway', 'duration' => '8', 'price' => 100, 'quota' => 2, 'status' => 'Aktif']);
        Payment::creating(static function (): never {
            throw new \RuntimeException('Payment insert failed');
        });
        $this->actingAs($user)->postJson('/api/enrollments', ['program_id' => $program->id])->assertServerError();
        $this->assertDatabaseCount('enrollments', 0);
    }

    public function test_admin_cannot_forge_relational_payment_or_student_records_through_portal_records(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['role' => 'admin'])->save();

        $this->actingAs($admin)
            ->postJson('/api/admin/records/payment', ['data' => ['amount' => 1], 'status' => 'Aktif'])
            ->assertNotFound();
        $this->postJson('/api/admin/records/student', ['data' => ['name' => 'Forged']])->assertNotFound();
        $this->assertDatabaseCount('portal_records', 0);
    }

    public function test_admin_reports_and_student_listing_use_relational_records(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['role' => 'admin'])->save();
        $learner = User::factory()->create(['name' => 'Ayu Learner']);
        $learner->forceFill(['role' => 'peserta'])->save();
        $program = Program::create(['title' => 'Report class', 'category' => 'Runway', 'duration' => '8', 'price' => 500, 'quota' => 3, 'status' => 'Aktif']);
        $enrollment = Enrollment::create(['participant_id' => Participant::create(['user_id' => $learner->id])->id, 'program_id' => $program->id]);
        Payment::create(['enrollment_id' => $enrollment->id, 'invoice' => 'RPT-1', 'amount' => 500, 'status' => 'paid']);

        $this->actingAs($admin)->getJson('/api/admin/students?search=Ayu')->assertOk()
            ->assertJsonPath('data.0.user.name', 'Ayu Learner')
            ->assertJsonPath('data.0.enrollments_count', 1);
        $this->getJson('/api/admin/reports')->assertOk()
            ->assertJsonPath('payments.verified_revenue', 500)
            ->assertJsonPath('payments.paid_count', 1);
    }

    public function test_admin_settings_are_upserted_and_members_cannot_change_them(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['role' => 'admin'])->save();
        $member = User::factory()->create();
        $member->forceFill(['role' => 'peserta'])->save();

        $this->actingAs($admin)->putJson('/api/admin/settings', ['data' => ['name' => 'Siluet Tala', 'email' => 'info@example.test']])
            ->assertOk()->assertJsonPath('data.name', 'Siluet Tala');
        $this->putJson('/api/admin/settings', ['data' => ['name' => 'Changed']])->assertOk();
        $this->assertDatabaseCount('portal_records', 1);
        $this->actingAs($member)->putJson('/api/admin/settings', ['data' => ['name' => 'Intrusion']])->assertForbidden();
        $this->assertDatabaseHas('portal_records', ['type' => 'settings']);
    }

    public function test_payment_and_student_cannot_be_created_as_portal_records(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['role' => 'admin'])->save();

        $this->actingAs($admin)->postJson('/api/admin/records/payment', ['data' => ['amount' => 100]])->assertNotFound();
        $this->postJson('/api/admin/records/student', ['data' => ['name' => 'Forged']])->assertNotFound();
        $this->assertDatabaseCount('portal_records', 0);
    }
}