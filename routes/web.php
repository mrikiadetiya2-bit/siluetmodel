<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\PortalRecordController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;

Route::get('/api/programs', [ProgramController::class, 'publicIndex']);
Route::get('/api/programs/{program}', [ProgramController::class, 'show']);
Route::middleware(['auth', 'role:peserta'])->post('/api/enrollments', [EnrollmentController::class, 'store']);
Route::middleware(['auth', 'role:admin,superadmin'])->group(function () {
    Route::get('/api/admin/programs', [ProgramController::class, 'index']);
    Route::post('/api/admin/programs', [ProgramController::class, 'store']);
    Route::put('/api/admin/programs/{program}', [ProgramController::class, 'update']);
    Route::delete('/api/admin/programs/{program}', [ProgramController::class, 'destroy']);
    Route::get('/api/admin/records/{type}', [PortalRecordController::class, 'index']);
    Route::put('/api/admin/settings', [PortalRecordController::class, 'upsertSettings']);
    Route::post('/api/admin/records/{type}', [PortalRecordController::class, 'store']);
    Route::put('/api/admin/records/{record}', [PortalRecordController::class, 'update']);
    Route::delete('/api/admin/records/{record}', [PortalRecordController::class, 'destroy']);
});
Route::get('/api/public/records/{type}', [PortalRecordController::class, 'publicIndex']);
Route::post('/api/public/records/{type}', [PortalRecordController::class, 'publicStore'])->middleware('throttle:5,1');
Route::get('/api/public/mentors', [App\Http\Controllers\AdminMentorController::class, 'publicIndex']);

Route::get('/', function () {
    try {
        $programs = App\Models\Program::where('status', 'Aktif')->take(4)->get();
        $testimonials = App\Models\PortalRecord::where('type', 'testimonial')->where('status', 'Aktif')->latest()->take(6)->get();
        $runwayModels = App\Models\PortalRecord::where('type', 'runway')->where('status', 'Aktif')->latest()->get();
    } catch (\Throwable) {
        $programs = collect();
        $testimonials = collect();
        $runwayModels = collect();
    }
    return view('home', compact('programs', 'testimonials', 'runwayModels'));
});

Route::get('/women', function () {
    return view('pages.women');
});

Route::get('/men', function () {
    return view('pages.men');
});

Route::get('/kids', function () {
    return view('pages.kids');
});

Route::get('/highlights', function () {
    return view('pages.highlights');
});

Route::get('/modeling-school', function () {
    return view('pages.school');
});

// Alias
Route::get('/program', function () {
    return redirect('/modeling-school');
});

Route::get('/mentor', function () {
    return view('pages.mentor');
});

Route::get('/about', function () {
    return view('pages.about');
});

// Alias
Route::get('/aboutus', function () {
    return redirect('/about');
});

Route::get('/contact', function () {
    return view('pages.contact');
});

Route::get('/login', function () {
    return view('pages.login');
})->name('login');
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login'])->middleware('guest');
Route::get('/admin/login', function () {
    return view('pages.admin-login');
})->middleware('guest')->name('admin.login');
Route::post('/admin/login', [App\Http\Controllers\AuthController::class, 'adminLogin'])->middleware('guest');

Route::get('/register', function () {
    return view('pages.register');
});
Route::post('/register', [App\Http\Controllers\AuthController::class, 'register'])->middleware('guest');
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth');
Route::post('/api/logout', [App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth');

Route::middleware(['auth', 'role:peserta,mentor,admin,superadmin'])->prefix('portal')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'show']);
    Route::get('/', fn () => view('portal.dashboard'));
});

Route::middleware(['auth', 'role:admin,superadmin'])->prefix('api/admin')->group(function () {
    Route::get('/reports', [DashboardController::class, 'reports']);
    Route::get('/students', [DashboardController::class, 'students']);
    Route::get('/mentors', [App\Http\Controllers\AdminMentorController::class, 'index']);
    Route::post('/mentors', [App\Http\Controllers\AdminMentorController::class, 'store']);
    Route::put('/mentors/{mentor}', [App\Http\Controllers\AdminMentorController::class, 'update']);
    Route::patch('/mentors/{mentor}/deactivate', [App\Http\Controllers\AdminMentorController::class, 'deactivate']);
    Route::patch('/mentors/{mentor}/activate', [App\Http\Controllers\AdminMentorController::class, 'activate']);
    Route::delete('/mentors/{mentor}', [App\Http\Controllers\AdminMentorController::class, 'destroy']);
    Route::apiResource('schedules', App\Http\Controllers\ClassScheduleController::class)->only(['index','store','update','destroy']);
    // Payments
    Route::get('/payments', [App\Http\Controllers\AdminPaymentController::class, 'index']);
    Route::patch('/payments/{payment}/confirm', [App\Http\Controllers\AdminPaymentController::class, 'confirm']);
    Route::patch('/payments/{payment}/reject', [App\Http\Controllers\AdminPaymentController::class, 'reject']);
    // Enrollments
    Route::patch('/enrollments/{enrollment}/status', [App\Http\Controllers\AdminEnrollmentController::class, 'updateStatus']);
    // Change password
    Route::post('/change-password', [App\Http\Controllers\AuthController::class, 'changePassword']);
});

Route::middleware(['auth', 'role:mentor,admin,superadmin'])->prefix('api')->group(function () {
    Route::get('/schedules', [App\Http\Controllers\ClassScheduleController::class, 'index']);
    Route::get('/schedules/{schedule}/attendance', [App\Http\Controllers\AttendanceController::class, 'index']);
    Route::post('/schedules/{schedule}/attendance', [App\Http\Controllers\AttendanceController::class, 'store']);
});

// Admin Routes (Dedicated Blade Views)
Route::prefix('admin')->middleware(['auth', 'role:admin,superadmin'])->group(function () {
    Route::get('/', function () {
        return view('admin.dashboard');
    });

    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    });

    Route::get('/program', function () {
        return view('admin.programs');
    });

    Route::get('/peserta', function () {
        return view('admin.students');
    });

    Route::get('/mentor', function () {
        return view('admin.mentors');
    });

    Route::get('/jadwal', function () {
        return view('admin.schedule');
    });

    Route::get('/pembayaran', function () {
        return view('admin.payments');
    });

    Route::get('/sertifikat', function () {
        return view('admin.certificates');
    });

    Route::get('/testimoni', function () {
        return view('admin.testimonials');
    });

    Route::get('/galeri', function () {
        return view('admin.gallery');
    });

    Route::get('/runway', function () {
        return view('admin.runway');
    });

    Route::get('/laporan', function () {
        return view('admin.reports');
    });

    Route::get('/pengaturan', function () {
        return view('admin.settings');
    });
});



