<?php

use App\Http\Controllers\EventPage;
use App\Http\Controllers\GoogleAuth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenDataSoftController;

Route::get('/list-event', [OpenDataSoftController::class, 'fetchData']);
Route::get('/list-event/test', [EventPage::class, 'fetchData']);
Route::get('auth/google', [GoogleAuth::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleAuth::class, 'handleGoogleCallback']);

