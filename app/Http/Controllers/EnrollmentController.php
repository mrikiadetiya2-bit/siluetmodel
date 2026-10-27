<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEnrollmentRequest;
use App\Services\EnrollmentService;
use Illuminate\Http\JsonResponse;

class EnrollmentController extends Controller
{
    public function store(StoreEnrollmentRequest $request, EnrollmentService $service): JsonResponse
    {
        $enrollment = $service->enroll($request->user(), $request->integer('program_id'));

        return response()->json($enrollment, 201);
    }
}