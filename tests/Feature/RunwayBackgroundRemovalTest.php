<?php

namespace Tests\Feature;

use App\Models\PortalRecord;
use App\Models\User;
use App\Services\BackgroundRemovalService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Mockery;
use RuntimeException;
use Tests\TestCase;

class RunwayBackgroundRemovalTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
    }

    public function test_guest_and_peserta_cannot_access_background_removal_endpoints(): void
    {
        $peserta = User::factory()->create(['role' => 'peserta']);

        $this->postJson('/api/admin/runway/remove-background')->assertUnauthorized();
        $this->actingAs($peserta)->postJson('/api/admin/runway/remove-background')->assertForbidden();
        $this->actingAs($peserta)->postJson('/api/admin/runway/discard-preview')->assertForbidden();
    }

    public function test_background_removal_validates_file_format_and_size(): void
    {
        $invalidFile = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $this->actingAs($this->admin)
            ->post('/api/admin/runway/remove-background', ['image' => $invalidFile], ['Accept' => 'application/json'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['image']);

        $tooLarge = UploadedFile::fake()->create('huge.jpg', 6000, 'image/jpeg');

        $this->actingAs($this->admin)
            ->post('/api/admin/runway/remove-background', ['image' => $tooLarge], ['Accept' => 'application/json'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['image']);
    }

    public function test_admin_can_process_preview_confirm_and_save_runway_model_with_backup(): void
    {
        Storage::fake('public');

        $token = Str::uuid()->toString();
        $tmpCutout = "runway/tmp/{$token}_cutout.png";
        $tmpOriginal = "runway/tmp/{$token}_original.jpg";

        // Seed fake temp files representing AI output + original backup
        Storage::disk('public')->put($tmpCutout, base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='));
        Storage::disk('public')->put($tmpOriginal, 'original-jpg-bytes');

        $mock = Mockery::mock(BackgroundRemovalService::class)->makePartial();
        $mock->shouldReceive('removeBackgroundToTemporaryPreview')
            ->once()
            ->andReturn([
                'token' => $token,
                'preview_url' => '/storage/'.$tmpCutout,
                'original_url' => '/storage/'.$tmpOriginal,
                'processed_path' => $tmpCutout,
                'original_path' => $tmpOriginal,
                'width' => 800,
                'height' => 1200,
                'model' => 'u2net',
            ]);
        $this->app->instance(BackgroundRemovalService::class, $mock);

        // Step 1: Upload photo to AI background removal endpoint
        $tinyPng = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
        $upload = UploadedFile::fake()->createWithContent('model-pose.png', $tinyPng);
        $previewRes = $this->actingAs($this->admin)
            ->post('/api/admin/runway/remove-background', ['image' => $upload], ['Accept' => 'application/json']);

        $previewRes->assertOk()
            ->assertJsonPath('processed_path', $tmpCutout)
            ->assertJsonPath('original_path', $tmpOriginal);

        // Step 2: Save runway model using confirmed AI result
        $storeRes = $this->actingAs($this->admin)
            ->post('/api/admin/records/runway', [
                'status' => 'Aktif',
                'processed_path' => $tmpCutout,
                'original_path' => $tmpOriginal,
                'data' => [
                    'name' => 'Alya Runway',
                    'role' => 'Finalis Duta Budaya',
                    'category' => 'Pageant & Runway',
                    'lookTitle' => 'Sasirangan Couture Gown',
                    'lookDesc' => 'Gaun etnik modern.',
                    'designer' => 'Siluet Signature',
                    'height' => '174 cm',
                    'bookingText' => 'Konsultasi Booking Model',
                ],
            ], ['Accept' => 'application/json']);

        $storeRes->assertCreated();
        $savedImage = $storeRes->json('data.image');
        $savedOriginal = $storeRes->json('data.original_image');

        $this->assertStringStartsWith('/storage/runway/', $savedImage);
        $this->assertStringEndsWith('.png', $savedImage);
        $this->assertStringStartsWith('/storage/runway/originals/', $savedOriginal);
        $this->assertStringEndsWith('.jpg', $savedOriginal);

        Storage::disk('public')->assertExists(substr($savedImage, strlen('/storage/')));
        Storage::disk('public')->assertExists(substr($savedOriginal, strlen('/storage/')));
        Storage::disk('public')->assertMissing($tmpCutout);
        Storage::disk('public')->assertMissing($tmpOriginal);

        // Step 3: Verify homepage Virtual Runway displays the transparent processed image
        $homeRes = $this->get('/');
        $homeRes->assertOk();
        $homeRes->assertSee($savedImage, false);

        // Step 4: Delete model cleans up both cutout and original backup
        $recordId = $storeRes->json('id');
        $this->actingAs($this->admin)
            ->deleteJson("/api/admin/records/{$recordId}")
            ->assertOk();

        Storage::disk('public')->assertMissing(substr($savedImage, strlen('/storage/')));
        Storage::disk('public')->assertMissing(substr($savedOriginal, strlen('/storage/')));
    }

    public function test_updating_runway_model_replaces_old_assets_and_handles_invalid_temp_path(): void
    {
        Storage::fake('public');

        $oldCutout = 'runway/old-cutout.png';
        $oldOriginal = 'runway/originals/old-original.jpg';
        Storage::disk('public')->put($oldCutout, 'old-png');
        Storage::disk('public')->put($oldOriginal, 'old-jpg');

        $record = PortalRecord::create([
            'type' => 'runway',
            'status' => 'Aktif',
            'data' => [
                'name' => 'Model Awal',
                'role' => 'Runway',
                'category' => 'Haute Couture',
                'lookTitle' => 'Look 1',
                'image' => '/storage/'.$oldCutout,
                'original_image' => '/storage/'.$oldOriginal,
            ],
        ]);

        // Reject path traversal attempt
        $this->actingAs($this->admin)
            ->putJson("/api/admin/records/{$record->id}", [
                'processed_path' => '../../.env',
                'data' => ['name' => 'Model Awal'],
            ])
            ->assertStatus(422);

        // Valid replacement
        $token = Str::uuid()->toString();
        $newTmpCutout = "runway/tmp/{$token}_cutout.png";
        $newTmpOriginal = "runway/tmp/{$token}_original.webp";
        Storage::disk('public')->put($newTmpCutout, 'new-png');
        Storage::disk('public')->put($newTmpOriginal, 'new-webp');

        $updateRes = $this->actingAs($this->admin)
            ->putJson("/api/admin/records/{$record->id}", [
                'processed_path' => $newTmpCutout,
                'original_path' => $newTmpOriginal,
                'data' => [
                    'name' => 'Model Diperbarui',
                    'role' => 'Runway Pro',
                    'category' => 'Haute Couture',
                    'lookTitle' => 'Look 2',
                ],
            ]);

        $updateRes->assertOk()->assertJsonPath('data.name', 'Model Diperbarui');
        $newImage = $updateRes->json('data.image');
        $newOriginal = $updateRes->json('data.original_image');

        Storage::disk('public')->assertMissing($oldCutout);
        Storage::disk('public')->assertMissing($oldOriginal);
        Storage::disk('public')->assertExists(substr($newImage, strlen('/storage/')));
        Storage::disk('public')->assertExists(substr($newOriginal, strlen('/storage/')));
    }

    public function test_discard_preview_removes_temp_files_and_ai_errors_return_clean_message(): void
    {
        Storage::fake('public');

        $token = Str::uuid()->toString();
        $tmpCutout = "runway/tmp/{$token}_cutout.png";
        $tmpOriginal = "runway/tmp/{$token}_original.png";
        Storage::disk('public')->put($tmpCutout, 'png');
        Storage::disk('public')->put($tmpOriginal, 'orig');

        $this->actingAs($this->admin)
            ->postJson('/api/admin/runway/discard-preview', [
                'processed_path' => $tmpCutout,
                'original_path' => $tmpOriginal,
            ])
            ->assertOk();

        Storage::disk('public')->assertMissing($tmpCutout);
        Storage::disk('public')->assertMissing($tmpOriginal);

        // Error handling returns friendly 422 without leaking credentials
        $mock = Mockery::mock(BackgroundRemovalService::class);
        $mock->shouldReceive('removeBackgroundToTemporaryPreview')
            ->once()
            ->andThrow(new RuntimeException('Gagal menghapus background foto dengan AI.'));
        $this->app->instance(BackgroundRemovalService::class, $mock);

        $tinyPng = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
        $this->actingAs($this->admin)
            ->post('/api/admin/runway/remove-background', [
                'image' => UploadedFile::fake()->createWithContent('fail.png', $tinyPng),
            ], ['Accept' => 'application/json'])
            ->assertStatus(422)
            ->assertJsonPath('message', 'Gagal menghapus background foto dengan AI.');
    }

    public function test_background_removal_accepts_lossless_base64_fallback_and_rejects_invalid_data(): void
    {
        $token = Str::uuid()->toString();
        $mock = Mockery::mock(BackgroundRemovalService::class)->makePartial();
        $mock->shouldReceive('removeBackgroundFromBytes')
            ->once()
            ->andReturn([
                'token' => $token,
                'preview_url' => "/storage/runway/tmp/{$token}_cutout.png",
                'original_url' => "/storage/runway/tmp/{$token}_original.png",
                'processed_path' => "runway/tmp/{$token}_cutout.png",
                'original_path' => "runway/tmp/{$token}_original.png",
                'width' => 1,
                'height' => 1,
                'model' => 'u2net',
            ]);
        $this->app->instance(BackgroundRemovalService::class, $mock);

        $this->actingAs($this->admin)
            ->postJson('/api/admin/runway/remove-background', [
                'image_base64' => 'data:text/plain;base64,aGVsbG8=',
            ])
            ->assertStatus(422);

        $tinyPngDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

        $this->actingAs($this->admin)
            ->postJson('/api/admin/runway/remove-background', [
                'image_base64' => $tinyPngDataUri,
            ])
            ->assertOk()
            ->assertJsonPath('token', $token);
    }
}
