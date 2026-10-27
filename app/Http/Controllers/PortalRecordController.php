<?php

namespace App\Http\Controllers;

use App\Models\PortalRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PortalRecordController extends Controller
{
    private const TYPES = ['testimonial', 'gallery', 'settings', 'contact', 'certificate', 'booking'];

    public function index(string $type): JsonResponse
    {
        abort_unless(in_array($type, self::TYPES, true), 404);

        return response()->json(PortalRecord::query()->where('type', $type)->latest()->get());
    }

    public function update(Request $request, PortalRecord $record): JsonResponse
    {
        abort_unless(in_array($record->type, self::TYPES, true), 404);
        $data = $request->validate([
            'data' => ['sometimes', 'array'],
            'status' => ['sometimes', 'string', 'max:40'],
        ]);
        $record->update($data);

        return response()->json($record->refresh());
    }

    public function destroy(PortalRecord $record): JsonResponse
    {
        abort_unless(in_array($record->type, self::TYPES, true), 404);
        $record->delete();

        return response()->json(['message' => 'Data berhasil dihapus.']);
    }

    public function publicIndex(string $type): JsonResponse
    {
        abort_unless(in_array($type, ['testimonial', 'gallery', 'mentor', 'schedule'], true), 404);

        $query = PortalRecord::query()->where('type', $type)->where('status', 'Aktif');

        return response()->json($query->latest()->get());
    }

    public function upsertSettings(Request $request): JsonResponse
    {
        $data = $request->validate([
            'data' => ['required', 'array'],
            'data.name' => ['sometimes', 'string', 'max:255'],
            'data.tagline' => ['sometimes', 'string', 'max:255'],
            'data.email' => ['sometimes', 'email', 'max:255'],
            'data.phone' => ['sometimes', 'string', 'max:40'],
            'data.whatsapp' => ['sometimes', 'string', 'max:40'],
            'data.address' => ['sometimes', 'string', 'max:1000'],
            'data.bcaAccount' => ['sometimes', 'string', 'max:100'],
            'data.mandiriAccount' => ['sometimes', 'string', 'max:100'],
        ]);

        $record = PortalRecord::updateOrCreate(['type' => 'settings'], ['data' => $data['data'], 'status' => 'Aktif']);
        return response()->json($record);
    }

    public function store(Request $request, string $type): JsonResponse
    {
        abort_unless(in_array($type, self::TYPES, true), 404);
        $data = $request->validate([
            'data' => ['required', 'array'],
            'status' => ['sometimes', 'string', 'max:40'],
        ]);
        if ($type === 'contact') {
            $request->validate([
                'data.name' => ['required', 'string', 'max:255'],
                'data.email' => ['required', 'email', 'max:255'],
                'data.phone' => ['nullable', 'string', 'max:40'],
            ]);
        }

        $record = DB::transaction(function () use ($type, $data) {
            $record = PortalRecord::create([
                'type' => $type,
                'data' => $data['data'],
                'status' => $data['status'] ?? 'Aktif',
            ]);

            return $record;
        });

        return response()->json($record, 201);
    }

    public function publicStore(Request $request, string $type): JsonResponse
    {
        abort_unless(in_array($type, ['contact', 'booking'], true), 404);

        return $this->store($request, $type);
    }

}