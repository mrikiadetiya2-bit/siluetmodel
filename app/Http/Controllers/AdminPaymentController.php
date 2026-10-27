<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminPaymentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Payment::with(['enrollment.participant.user:id,name,email', 'enrollment.program:id,title'])
            ->latest();

        if ($status = $request->string('status')->trim()->toString()) {
            $query->where('status', $status);
        }

        return response()->json($query->paginate(min($request->integer('per_page', 50), 200)));
    }

    public function confirm(Request $request, Payment $payment): JsonResponse
    {
        if ($payment->status === 'paid') {
            return response()->json(['message' => 'Pembayaran sudah dikonfirmasi sebelumnya.'], 422);
        }

        $payment->update([
            'status' => 'paid',
            'paid_at' => now(),
            'provider_reference' => $request->string('reference') ?: $payment->provider_reference,
        ]);

        // Update enrollment status to confirmed
        $payment->enrollment?->update(['status' => 'confirmed']);

        return response()->json($payment->refresh()->load(['enrollment.participant.user', 'enrollment.program']));
    }

    public function reject(Request $request, Payment $payment): JsonResponse
    {
        if ($payment->status === 'rejected') {
            return response()->json(['message' => 'Pembayaran sudah ditolak sebelumnya.'], 422);
        }

        $payment->update(['status' => 'rejected']);
        $payment->enrollment?->update(['status' => 'cancelled']);

        return response()->json($payment->refresh()->load(['enrollment.participant.user', 'enrollment.program']));
    }
}
