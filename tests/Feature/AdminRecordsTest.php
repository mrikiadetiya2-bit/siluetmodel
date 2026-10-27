<?php

namespace Tests\Feature;

use App\Models\PortalRecord;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminRecordsTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
    }

    public function test_admin_can_crud_testimonials(): void
    {
        // 1. Create
        $res = $this->actingAs($this->admin)->postJson('/api/admin/records/testimonial', [
            'status' => 'Aktif',
            'data' => [
                'name' => 'Nadia Putri',
                'quote' => 'Kelasnya luar biasa!',
                'role' => 'Alumni',
                'featuredOnHome' => true,
            ],
        ]);
        $res->assertStatus(201);
        $recordId = $res->json('id');

        // 2. List
        $listRes = $this->actingAs($this->admin)->getJson('/api/admin/records/testimonial');
        $listRes->assertStatus(200)->assertJsonFragment(['name' => 'Nadia Putri']);

        // 3. Update
        $upRes = $this->actingAs($this->admin)->putJson("/api/admin/records/{$recordId}", [
            'status' => 'Draft',
            'data' => [
                'name' => 'Nadia Putri Updated',
                'quote' => 'Kelasnya sangat luar biasa!',
            ],
        ]);
        $upRes->assertStatus(200);

        // 4. Delete
        $delRes = $this->actingAs($this->admin)->deleteJson("/api/admin/records/{$recordId}");
        $delRes->assertStatus(200);
        $this->assertDatabaseMissing('portal_records', ['id' => $recordId]);
    }

    public function test_public_can_submit_contact_and_booking(): void
    {
        // Public contact submit
        $contactRes = $this->postJson('/api/public/records/contact', [
            'data' => [
                'name' => 'Calon Siswa',
                'email' => 'calon@example.com',
                'phone' => '081234567890',
                'message' => 'Info pendaftaran',
            ],
        ]);
        $contactRes->assertStatus(201);
        $this->assertDatabaseHas('portal_records', ['type' => 'contact']);

        // Public booking submit
        $bookingRes = $this->postJson('/api/public/records/booking', [
            'data' => [
                'clientName' => 'Brand Fashion',
                'email' => 'brand@example.com',
                'talentName' => 'Aura Clarissa',
                'division' => 'Women',
            ],
        ]);
        $bookingRes->assertStatus(201);
        $this->assertDatabaseHas('portal_records', ['type' => 'booking']);
    }

    public function test_admin_can_save_settings(): void
    {
        $res = $this->actingAs($this->admin)->putJson('/api/admin/settings', [
            'data' => [
                'name' => 'Siluet Model Tala Academy',
                'email' => 'info@siluetmodel.com',
                'phone' => '+62 21 555-0199',
            ],
        ]);
        $res->assertStatus(200);
        $this->assertDatabaseHas('portal_records', ['type' => 'settings']);
    }
}
