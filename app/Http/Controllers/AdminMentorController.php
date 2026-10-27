<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminMentorController extends Controller
{
    public function index() { return Mentor::withCount('schedules')->orderBy('name')->paginate(20); }
    public function publicIndex() { return response()->json(Mentor::where('active', true)->orderBy('name')->get()); }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => ['required','string','max:255'], 'title' => ['nullable','string','max:255'], 'bio' => ['nullable','string','max:5000'], 'specialties' => ['nullable','array','max:30'], 'specialties.*' => ['string','max:100'], 'photo' => ['nullable','image','max:5120']]);
        if ($request->hasFile('photo')) $data['photo_path'] = $request->file('photo')->store('mentors', 'public');
        return response()->json(Mentor::create($data), 201);
    }

    public function update(Request $request, Mentor $mentor)
    {
        $data = $request->validate(['name' => ['sometimes','required','string','max:255'], 'title' => ['nullable','string','max:255'], 'bio' => ['nullable','string','max:5000'], 'specialties' => ['nullable'], 'photo' => ['nullable','image','max:5120']]);
        if (array_key_exists('specialties', $data) && is_string($data['specialties'])) {
            $data['specialties'] = array_values(array_filter(array_map('trim', explode(',', $data['specialties']))));
        }
        if (isset($data['specialties'])) validator($data, ['specialties' => ['array','max:30'], 'specialties.*' => ['string','max:100']])->validate();
        if ($request->hasFile('photo')) { if ($mentor->photo_path) Storage::disk('public')->delete($mentor->photo_path); $data['photo_path'] = $request->file('photo')->store('mentors', 'public'); }
        $mentor->update($data);
        return response()->json($mentor->fresh());
    }

    public function deactivate(Mentor $mentor)
    {
        $mentor->update(['active' => false]);
        return response()->json($mentor);
    }

    public function activate(Mentor $mentor)
    {
        $mentor->update(['active' => true]);
        return response()->json($mentor);
    }

    public function destroy(Mentor $mentor)
    {
        if ($mentor->schedules()->exists()) {
            return response()->json(['message' => 'Mentor tidak dapat dihapus karena memiliki jadwal kelas terkait. Nonaktifkan mentor terlebih dahulu.'], 422);
        }
        if ($mentor->photo_path) {
            Storage::disk('public')->delete($mentor->photo_path);
        }
        $mentor->delete();
        return response()->json(['message' => 'Mentor berhasil dihapus.']);
    }
}