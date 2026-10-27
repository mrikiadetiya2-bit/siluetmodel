<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminEnrollmentController extends Controller
{
    public function updateStatus(Request $request, Enrollment $enrollment): JsonResponse
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'confirmed', 'cancelled', 'completed'])],
        ]);

        $enrollment->update($data);

        return response()->json($enrollment->fresh()->load(['participant.user', 'program', 'payment']));
    }
}
