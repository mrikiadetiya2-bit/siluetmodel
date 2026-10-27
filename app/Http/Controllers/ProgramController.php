<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Mentor;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProgramController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Program::query()->orderBy('id')->get());
    }

    public function publicIndex(): JsonResponse
    {
        return response()->json(Program::query()->where('status', 'Aktif')->orderBy('id')->get());
    }

    public function show(Program $program): JsonResponse
    {
        abort_unless($program->status === 'Aktif', 404);

        return response()->json($program);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate(['image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120']]);
        $schedule = $request->validate([
            'mentor_id' => ['required', 'integer', Rule::exists('mentors', 'id')->where('active', true)],
            'class_day' => ['required', Rule::in(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])],
            'first_class_date' => ['nullable', 'date'],
            'class_start_time' => ['required', 'date_format:H:i'],
            'class_end_time' => ['required', 'date_format:H:i', 'after:class_start_time'],
            'meeting_count' => ['required', 'integer', 'min:1', 'max:100'],
            'location' => ['required', 'string', 'max:255'],
        ]);
        $data = $this->validated($request);
        unset($data['enrolled']);
        $imagePath = $request->file('image')->store('programs', 'public');
        $data['image'] = '/storage/'.$imagePath;
        try {
            $program = DB::transaction(function () use ($data, $schedule) {
                $program = Program::create($data);
                $firstDate = Carbon::parse($schedule['first_class_date'] ?: now()->toDateString())->startOfDay();
                while ($firstDate->lt(now()->startOfDay()) || $firstDate->englishDayOfWeek !== $schedule['class_day']) {
                    $firstDate->addDay();
                }
                $mentor = Mentor::findOrFail($schedule['mentor_id']);
                for ($meeting = 0; $meeting < $schedule['meeting_count']; $meeting++) {
                    $startsAt = $firstDate->copy()->addWeeks($meeting)->setTimeFromTimeString($schedule['class_start_time']);
                    $endsAt = $firstDate->copy()->addWeeks($meeting)->setTimeFromTimeString($schedule['class_end_time']);
                    if (\App\Models\ClassSchedule::where('mentor_id', $mentor->id)->where('status', '!=', 'cancelled')->where('starts_at', '<', $endsAt)->where('ends_at', '>', $startsAt)->exists()) {
                        throw \Illuminate\Validation\ValidationException::withMessages(['class_start_time' => 'Mentor sudah memiliki jadwal yang bentrok pada salah satu pertemuan.']);
                    }
                    $program->classSchedules()->create([
                        'mentor_id' => $mentor->id,
                        'starts_at' => $startsAt,
                        'ends_at' => $endsAt,
                        'location' => $schedule['location'],
                        'capacity' => $data['quota'],
                    ]);
                }
                return $program;
            });
        } catch (\Throwable $error) {
            Storage::disk('public')->delete($imagePath);
            throw $error;
        }

        return response()->json($program->refresh(), 201);
    }

    public function update(Request $request, Program $program): JsonResponse
    {
        $data = $this->validated($request);
        unset($data['enrolled']);
        if ($request->hasFile('image')) {
            $oldImage = $program->image;
            $data['image'] = '/storage/'.$request->file('image')->store('programs', 'public');
            if (str_starts_with($oldImage, '/storage/')) {
                Storage::disk('public')->delete(substr($oldImage, strlen('/storage/')));
            }
        }
        $program->update($data);

        return response()->json($program->refresh());
    }

    public function destroy(Program $program): JsonResponse
    {
        if ($program->status !== 'Nonaktif' && $program->enrollments()->exists()) {
            $program->update(['status' => 'Nonaktif']);

            return response()->json(['message' => 'Program dinonaktifkan karena memiliki riwayat pendaftaran.', 'program' => $program->refresh()]);
        }

        if ($program->enrollments()->exists()) {
            return response()->json([
                'message' => 'Program tidak dapat dihapus permanen karena memiliki riwayat pendaftaran.',
                'program' => $program->refresh(),
            ], 409);
        }

        if ($program->classSchedules()->exists()) {
            return response()->json([
                'message' => 'Program tidak dapat dihapus karena masih memiliki jadwal kelas. Hapus jadwal terkait terlebih dahulu.',
            ], 409);
        }

        $program->delete();

        return response()->json(['message' => 'Program berhasil dihapus.']);
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'enrolled' => ['sometimes', 'integer', 'min:0'],
            'quota' => ['required', 'integer', 'min:1'],
            'mentor' => ['sometimes', 'string', 'max:255'],
            'status' => ['required', Rule::in(['Aktif', 'Penuh', 'Draft', 'Nonaktif'])],
            'image' => ['sometimes', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'description' => ['nullable', 'string'],
            'syllabus' => ['sometimes', 'array'],
            'syllabus.*' => ['string', 'max:255'],
            'perks' => ['sometimes', 'array'],
            'perks.*' => ['string', 'max:255'],
        ]);
        return $validated;
    }
}