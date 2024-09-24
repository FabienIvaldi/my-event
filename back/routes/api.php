<?php

use App\Http\Controllers\EventPage;
use App\Http\Controllers\OpenDataSoftController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/list-event', [OpenDataSoftController::class, 'fetchData']);
Route::get('/show-info/{slug}', [EventPage::class, 'fetchData']);
Route::post('/save-user', [UserController::class, 'saveUser']);
Route::post('/upload-profile-picture', [UserController::class, 'uploadProfilePicture']);

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return Auth::user();
// });
