<?php

namespace Tests\Feature;

use App\Models\ClassSchedule;
use App\Models\Enrollment;
use App\Models\Mentor;
use App\Models\Participant;
use App\Models\Program;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class AdminSchedulingTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $user = User::factory()->create();
        $user->forceFill(['role' => 'admin'])->save();
        return $user;
    }

    private function program(): Program
    {
        return Program::create(['title' => 'Runway', 'category' => 'Modeling', 'duration' => '8 minggu', 'price' => 100, 'quota' => 20, 'status' => 'Aktif']);
    }

    public function test_admin_can_create_mentor_and_schedule_and_conflict_is_rejected(): void
    {
        $this->actingAs($this->admin());
        $mentor = $this->postJson('/api/admin/mentors', ['name' => 'Mentor A', 'specialties' => ['Runway']])->assertCreated()->json();
        $this->assertDatabaseHas('mentors', ['id' => $mentor['id'], 'active' => true]);
        $payload = ['program_id' => $this->program()->id, 'mentor_id' => $mentor['id'], 'starts_at' => '2027-01-01 09:00:00', 'ends_at' => '2027-01-01 10:00:00', 'location' => 'Studio', 'capacity' => 12];
        $this->postJson('/api/admin/schedules', $payload)->assertCreated();
        $payload['starts_at'] = '2027-01-01 09:30:00';
        $payload['ends_at'] = '2027-01-01 10:30:00';
        $this->postJson('/api/admin/schedules', $payload)->assertUnprocessable();
        $this->assertDatabaseCount('class_schedules', 1);
    }

    public function test_mentor_can_only_mark_attendance_for_assigned_class_and_duplicate_is_blocked(): void
    {
        $mentorUser = User::factory()->create();
        $mentorUser->forceFill(['role' => 'mentor'])->save();
        $mentor = Mentor::create(['user_id' => $mentorUser->id, 'name' => 'Assigned']);
        $schedule = ClassSchedule::create(['program_id' => $this->program()->id, 'mentor_id' => $mentor->id, 'starts_at' => now()->addDay(), 'ends_at' => now()->addDay()->addHour(), 'location' => 'Studio', 'capacity' => 10]);
        $student = User::factory()->create();
        $participant = Participant::create(['user_id' => $student->id]);
        Enrollment::create(['participant_id' => $participant->id, 'program_id' => $schedule->program_id, 'status' => 'confirmed']);
        $this->actingAs($mentorUser)->postJson("/api/schedules/{$schedule->id}/attendance", ['participant_id' => $participant->id, 'status' => 'present'])->assertCreated();
        $this->postJson("/api/schedules/{$schedule->id}/attendance", ['participant_id' => $participant->id, 'status' => 'present'])->assertStatus(409);
        $outsider = User::factory()->create();
        $outsider->forceFill(['role' => 'mentor'])->save();
        $this->actingAs($outsider)->getJson("/api/schedules/{$schedule->id}/attendance")->assertForbidden();
        $this->assertDatabaseCount('attendances', 1);
    }

    public function test_non_admin_cannot_create_mentor_or_schedule(): void
    {
        $student = User::factory()->create();
        $student->forceFill(['role' => 'peserta'])->save();
        $this->actingAs($student)->postJson('/api/admin/mentors', ['name' => 'Forbidden'])->assertForbidden();
        $this->assertDatabaseCount('mentors', 0);
    }

    public function test_missed_scheduled_classes_move_forward_by_weeks_and_completed_or_attended_classes_stay_unchanged(): void
    {
        Carbon::setTestNow(Carbon::parse('2027-01-18 12:00:00'));
        try {
            $program = $this->program();
            $mentor = Mentor::create(['name' => 'Mentor Mingguan']);
            $missed = ClassSchedule::create([
                'program_id' => $program->id, 'mentor_id' => $mentor->id,
                'starts_at' => '2027-01-04 09:00:00', 'ends_at' => '2027-01-04 10:00:00',
                'location' => 'Studio', 'capacity' => 10,
            ]);
            $completed = ClassSchedule::create([
                'program_id' => $program->id, 'mentor_id' => $mentor->id,
                'starts_at' => '2027-01-04 11:00:00', 'ends_at' => '2027-01-04 12:00:00',
                'location' => 'Studio', 'capacity' => 10, 'status' => 'completed',
            ]);

            $this->artisan('classes:reschedule-missed')->expectsOutput('Jadwal terlewat yang dipindahkan: 1')->assertExitCode(0);

            $this->assertDatabaseHas('class_schedules', ['id' => $missed->id, 'starts_at' => '2027-01-25 09:00:00', 'ends_at' => '2027-01-25 10:00:00']);
            $this->assertDatabaseHas('class_schedules', ['id' => $completed->id, 'starts_at' => '2027-01-04 11:00:00', 'status' => 'completed']);
        } finally {
            Carbon::setTestNow();
        }
    }
}