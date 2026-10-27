<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AttendanceController extends Controller
{
    public function index(Request $request, ClassSchedule $schedule)
    {
        $this->authorizeSchedule($request, $schedule);
        return $schedule->attendances()->with('participant.user:id,name,email')->paginate(50);
    }

    public function store(Request $request, ClassSchedule $schedule)
    {
        $this->authorizeSchedule($request, $schedule);
        $data = $request->validate(['participant_id' => ['required','integer',Rule::exists('enrollments','participant_id')->where('program_id',$schedule->program_id)->whereIn('status',['confirmed','active'])], 'status' => ['required',Rule::in(['present','absent','late','excused'])]]);
        $record = Attendance::firstOrCreate(['class_schedule_id' => $schedule->id, 'participant_id' => $data['participant_id']], ['status' => $data['status'], 'marked_by' => $request->user()->id, 'marked_at' => now()]);
        if (!$record->wasRecentlyCreated) return response()->json(['message' => 'Kehadiran peserta pada sesi ini sudah tercatat.'], 409);
        return response()->json($record, 201);
    }

    private function authorizeSchedule(Request $request, ClassSchedule $schedule): void
    {
        $user = $request->user();
        if (in_array($user->role, ['admin','superadmin'], true)) return;
        abort_unless($user->role === 'mentor' && $schedule->mentor()->where('user_id',$user->id)->exists(), 403);
    }
}