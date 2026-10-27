<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        return $this->authenticate($request, false);
    }

    public function adminLogin(Request $request): JsonResponse
    {
        return $this->authenticate($request, true);
    }

    private function authenticate(Request $request, bool $adminOnly): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json(['message' => 'Email atau kata sandi tidak cocok.'], 422);
        }

        $user = $request->user();
        $isAdmin = $user->hasAnyRole(['admin', 'superadmin']);
        if ($adminOnly !== $isAdmin) {
            Auth::logout();

            return response()->json([
                'message' => $adminOnly ? 'Akun ini bukan akun administrator.' : 'Akun administrator harus masuk melalui halaman login admin.',
            ], 403);
        }

        $request->session()->regenerate();

        return response()->json(['message' => 'Login berhasil.', 'role' => $user->role]);
    }

    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::min(8)],
            'role' => ['prohibited'],
            'phone' => ['required', 'string', 'max:40'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
        $user->participant()->create(['phone' => $data['phone']]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json(['message' => 'Pendaftaran berhasil.'], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout berhasil.']);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        $user = $request->user();

        if (!\Illuminate\Support\Facades\Hash::check($data['current_password'], $user->password)) {
            return response()->json(['message' => 'Password lama tidak sesuai.', 'errors' => ['current_password' => ['Password lama tidak sesuai.']]], 422);
        }

        $user->update(['password' => $data['password']]);

        return response()->json(['message' => 'Password berhasil diubah.']);
    }
}