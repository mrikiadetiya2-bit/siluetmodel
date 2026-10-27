<?php

namespace App\Http\Controllers;

use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ClassScheduleController extends Controller
{
    public function index(Request $request)
    {
        $query = ClassSchedule::with(['program:id,title','mentor:id,name'])->withCount('attendances')->orderBy('starts_at');
        if ($request->user()->role === 'mentor') $query->whereHas('mentor', fn ($q) => $q->where('user_id', $request->user()->id));
        if ($request->user()->role === 'peserta') $query->whereHas('program.enrollments', fn ($q) => $q->whereHas('participant', fn ($p) => $p->where('user_id', $request->user()->id))->whereIn('status', ['confirmed','active']));
        return $query->paginate(30);
    }

    public function store(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['admin','superadmin'], true), 403);
        return response()->json(ClassSchedule::create($this->validated($request)), 201);
    }

    public function update(Request $request, ClassSchedule $schedule)
    {
        abort_unless(in_array($request->user()->role, ['admin','superadmin'], true), 403);
        $schedule->update($this->validated($request, true, $schedule));
        return response()->json($schedule->fresh()->load(['program:id,title','mentor:id,name']));
    }

    public function destroy(Request $request, ClassSchedule $schedule)
    {
        abort_unless(in_array($request->user()->role, ['admin','superadmin'], true), 403);
        if ($schedule->attendances()->exists()) {
            $schedule->update(['status' => 'cancelled']);
            return response()->json(['message' => 'Jadwal dibatalkan karena sudah ada riwayat kehadiran.', 'schedule' => $schedule->refresh()]);
        }
        $schedule->delete();
        return response()->json(['message' => 'Jadwal berhasil dihapus.']);
    }

    private function validated(Request $request, bool $partial = false, ?ClassSchedule $current = null): array
    {
        $rules = [
            'program_id' => [$partial ? 'sometimes' : 'required','integer','exists:programs,id'],
            'mentor_id' => [$partial ? 'sometimes' : 'required','integer',Rule::exists('mentors','id')->where('active', true)],
            'starts_at' => [$partial ? 'sometimes' : 'required','date'],
            'ends_at' => [$partial ? 'sometimes' : 'required','date','after:starts_at'],
            'location' => [$partial ? 'sometimes' : 'required','string','max:255'],
            'capacity' => [$partial ? 'sometimes' : 'required','integer','min:1','max:1000'],
            'status' => ['sometimes',Rule::in(['scheduled','completed','cancelled'])],
        ];
        $data = $request->validate($rules);
        $start = $data['starts_at'] ?? $current?->starts_at;
        $end = $data['ends_at'] ?? $current?->ends_at;
        $mentorId = $data['mentor_id'] ?? $current?->mentor_id;
        if ($start && $end && ClassSchedule::where('mentor_id',$mentorId)->where('id','!=',$current?->id ?? 0)->where('status','!=','cancelled')->where('starts_at','<',$end)->where('ends_at','>',$start)->exists()) {
            abort(response()->json(['message' => 'Mentor sudah memiliki jadwal pada waktu tersebut.','errors' => ['starts_at' => ['Jadwal mentor bentrok.']]], 422));
        }
        return $data;
    }
}