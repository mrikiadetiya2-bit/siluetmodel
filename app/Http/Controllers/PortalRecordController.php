<?php

namespace App\Http\Controllers;

use App\Models\PortalRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        if ($record->type === 'gallery') {
            $request->validate([
                'images' => ['sometimes', 'array', 'size:3'],
                'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            ]);
            $galleryData = array_merge($record->data ?? [], $request->input('data', []));
            $request->validate([
                'data.title' => ['sometimes', 'required', 'string', 'max:255'],
                'data.audience' => ['sometimes', 'required', 'in:Man,Women,Kids'],
            ]);
            if ($request->hasFile('images')) {
                $oldImages = $record->data['images'] ?? [];
                $galleryData['images'] = array_map(fn ($file) => '/storage/'.$file->store('gallery', 'public'), $request->file('images'));
                $galleryData['image'] = $galleryData['images'][0];
                foreach ($oldImages as $oldImage) {
                    if (is_string($oldImage) && str_starts_with($oldImage, '/storage/')) {
                        Storage::disk('public')->delete(substr($oldImage, strlen('/storage/')));
                    }
                }
            }
            $data['data'] = $galleryData;
        }
        $record->update($data);

        return response()->json($record->refresh());
    }

    public function destroy(PortalRecord $record): JsonResponse
    {
        abort_unless(in_array($record->type, self::TYPES, true), 404);
        if ($record->type === 'gallery') {
            foreach ($record->data['images'] ?? [$record->data['image'] ?? null] as $image) {
                if (is_string($image) && str_starts_with($image, '/storage/')) {
                    Storage::disk('public')->delete(substr($image, strlen('/storage/')));
                }
            }
        }
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
        if (is_string($data['data'] ?? null)) {
            $data['data'] = json_decode($data['data'], true) ?: [];
        }
        if ($type === 'gallery' && is_string($data['data']['campaigns'] ?? null)) {
            $data['data']['campaigns'] = json_decode($data['data']['campaigns'], true) ?: [];
        }
        if ($type === 'contact') {
            $request->validate([
                'data.name' => ['required', 'string', 'max:255'],
                'data.email' => ['required', 'email', 'max:255'],
                'data.phone' => ['nullable', 'string', 'max:40'],
            ]);
        }

        if ($type === 'gallery') {
            $request->validate([
                'images' => ['required', 'array', 'size:3'],
                'images.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
                'data.title' => ['required', 'string', 'max:255'],
                'data.category' => ['required', 'string', 'max:100'],
                'data.audience' => ['required', 'in:Man,Women,Kids'],
                'data.date' => ['nullable', 'string', 'max:100'],
                'data.age' => ['nullable', 'integer', 'min:1', 'max:120'],
                'data.height' => ['nullable', 'string', 'max:50'],
                'data.campaigns' => ['nullable', 'array', 'max:20'],
                'data.campaigns.*' => ['string', 'max:255'],
            ]);
            $data['data']['images'] = array_map(fn ($file) => '/storage/'.$file->store('gallery', 'public'), $request->file('images'));
            $data['data']['image'] = $data['data']['images'][0];
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