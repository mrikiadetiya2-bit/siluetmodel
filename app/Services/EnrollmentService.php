<?php

namespace App\Services;

use App\Models\Enrollment;
use App\Models\Participant;
use App\Models\Payment;
use App\Models\Program;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EnrollmentService
{
    public function enroll(User $user, int $programId): Enrollment
    {
        return DB::transaction(function () use ($user, $programId) {
            // Lock program row to serialize concurrent quota checks in PostgreSQL.
            $program = Program::query()->lockForUpdate()->findOrFail($programId);
            abort_unless($program->status === 'Aktif', 422, 'Program tidak menerima pendaftaran.');

            $participant = Participant::query()->firstOrCreate(
                ['user_id' => $user->id],
                ['phone' => null],
            );

            $existing = Enrollment::query()
                ->where('participant_id', $participant->id)
                ->where('program_id', $program->id)
                ->whereIn('status', ['pending', 'confirmed'])
                ->exists();
            if ($existing) {
                throw ValidationException::withMessages(['program_id' => 'Pendaftaran aktif untuk program ini sudah ada.']);
            }

            $occupied = Enrollment::query()
                ->where('program_id', $program->id)
                ->whereIn('status', ['pending', 'confirmed'])
                ->count();
            if ($occupied >= $program->quota) {
                throw ValidationException::withMessages(['program_id' => 'Kuota program sudah penuh.']);
            }

            $enrollment = Enrollment::create([
                'participant_id' => $participant->id,
                'program_id' => $program->id,
                'status' => 'pending',
            ]);

            Payment::create([
                'enrollment_id' => $enrollment->id,
                'invoice' => 'SMT-'.strtoupper(bin2hex(random_bytes(12))),
                'amount' => $program->price,
                'status' => 'pending',
            ]);

            return $enrollment->load(['program', 'payment']);
        }, attempts: 3);
    }
}