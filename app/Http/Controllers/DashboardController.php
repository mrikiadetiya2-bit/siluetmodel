<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\Participant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Program;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function students(Request $request): JsonResponse
    {
        $query = Participant::query()->with('user:id,name,email')->withCount('enrollments')->with(['enrollments' => fn ($query) => $query->with(['program:id,title', 'payment'])->latest()])->latest();
        if ($search = $request->string('search')->trim()->toString()) {
            $query->whereHas('user', fn ($users) => $users->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"));
        }
        return response()->json($query->paginate(min($request->integer('per_page', 20), 100)));
    }

    public function reports(Request $request): JsonResponse
    {
        $from = $request->date('from')?->startOfDay();
        $to = $request->date('to')?->endOfDay();
        $enrollments = Enrollment::query()->with(['program:id,title', 'participant.user:id,name,email', 'payment'])
            ->when($from, fn ($q) => $q->where('created_at', '>=', $from))
            ->when($to, fn ($q) => $q->where('created_at', '<=', $to));
        return response()->json([
            'enrollments' => (clone $enrollments)->latest()->paginate(min($request->integer('per_page', 50), 100)),
            'by_program' => (clone $enrollments)->select('program_id', DB::raw('count(*) as enrollment_count'))->groupBy('program_id')->with('program:id,title')->get(),
            'statistics' => [
                'participants' => Participant::count(),
                'enrollments' => Enrollment::count(),
                'activePrograms' => Program::where('status', 'Aktif')->count(),
            ],
            'payments' => [
                'pending' => Payment::where('status', 'pending')->count(),
                'paid_count' => Payment::where('status', 'paid')->count(),
                'verified_revenue' => Payment::where('status', 'paid')->sum('amount'),
            ],
        ]);
    }

    public function show(Request $request)
    {
        $user = $request->user();
        $role = $user->role;

        if (! $request->wantsJson()) {
            if (in_array($role, ['admin', 'superadmin'], true)) {
                return redirect('/admin/dashboard');
            }
            return view('portal.dashboard');
        }

        if (in_array($role, ['admin', 'superadmin'], true)) {
            return response()->json([
                'role' => $role,
                'statistics' => [
                    'activePrograms' => Program::where('status', 'Aktif')->count(),
                    'participants' => Participant::count(),
                    'enrollments' => Enrollment::count(),
                    'pendingPayments' => Payment::where('status', 'pending')->count(),
                    'successfulPayments' => Payment::where('status', 'paid')->count(),
                ],
            ]);
        }

        $enrollments = $user->participant?->enrollments()
            ->with(['program', 'payment'])
            ->latest()
            ->get() ?? collect();

        return response()->json([
            'role' => $role,
            'statistics' => [
                'enrollments' => $enrollments->count(),
                'pendingPayments' => $enrollments->filter(fn ($enrollment) => $enrollment->payment?->status === 'pending')->count(),
                'successfulPayments' => $enrollments->filter(fn ($enrollment) => $enrollment->payment?->status === 'paid')->count(),
            ],
            'enrollments' => $enrollments->values(),
        ]);
    }
}