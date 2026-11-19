<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatbotController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Stateless routes for modern frontend communication.
|
*/

Route::post('/chat', [ChatbotController::class, 'chat']);
Route::post('/chat/reset', [ChatbotController::class, 'reset']);
