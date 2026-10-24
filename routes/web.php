<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
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
});

Route::get('/register', function () {
    return view('pages.register');
});

// Admin Routes (Dedicated Blade Views)
Route::prefix('admin')->group(function () {
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

    Route::get('/laporan', function () {
        return view('admin.reports');
    });

    Route::get('/pengaturan', function () {
        return view('admin.settings');
    });
});



