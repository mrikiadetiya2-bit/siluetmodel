<?php

namespace Tests\Feature;

use App\Models\Mentor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminMentorTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $peserta;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->peserta = User::factory()->create(['role' => 'peserta']);
    }

    public function test_admin_can_list_mentors(): void
    {
        Mentor::create([
            'name' => 'Victoria Sandra',
            'title' => 'Runway Director',
            'bio' => 'Senior instructor',
            'specialties' => ['Catwalk'],
            'active' => true,
        ]);

        $response = $this->actingAs($this->admin)->getJson('/api/admin/mentors');
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Victoria Sandra']);
    }

    public function test_admin_can_create_update_activate_deactivate_mentor(): void
    {
        // 1. Create
        $createRes = $this->actingAs($this->admin)->postJson('/api/admin/mentors', [
            'name' => 'Bintang Daniswara',
            'title' => 'Creative Director',
            'bio' => 'Studio photography instructor',
            'specialties' => ['Posing', 'Editorial'],
        ]);
        $createRes->assertStatus(201);
        $mentorId = $createRes->json('id');

        // 2. Update
        $updateRes = $this->actingAs($this->admin)->putJson("/api/admin/mentors/{$mentorId}", [
            'name' => 'Bintang Daniswara Updated',
            'title' => 'Lead Director',
        ]);
        $updateRes->assertStatus(200)->assertJsonFragment(['name' => 'Bintang Daniswara Updated']);

        // 3. Deactivate
        $deactivateRes = $this->actingAs($this->admin)->patchJson("/api/admin/mentors/{$mentorId}/deactivate");
        $deactivateRes->assertStatus(200)->assertJsonFragment(['active' => false]);

        // 4. Activate
        $activateRes = $this->actingAs($this->admin)->patchJson("/api/admin/mentors/{$mentorId}/activate");
        $activateRes->assertStatus(200)->assertJsonFragment(['active' => true]);

        // 5. Destroy
        $destroyRes = $this->actingAs($this->admin)->deleteJson("/api/admin/mentors/{$mentorId}");
        $destroyRes->assertStatus(200);
        $this->assertDatabaseMissing('mentors', ['id' => $mentorId]);
    }

    public function test_public_can_view_active_mentors(): void
    {
        Mentor::create([
            'name' => 'Active Mentor',
            'title' => 'Instructor',
            'active' => true,
        ]);
        Mentor::create([
            'name' => 'Inactive Mentor',
            'title' => 'Instructor',
            'active' => false,
        ]);

        $response = $this->getJson('/api/public/mentors');
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Active Mentor'])
            ->assertJsonMissing(['name' => 'Inactive Mentor']);
    }
}
