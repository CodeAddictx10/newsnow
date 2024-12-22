<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\AuthorController;
use App\Http\Controllers\Api\V1\BreakingNewsController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\LoginController;
use App\Http\Controllers\Api\V1\NewsAggregatorController;
use App\Http\Controllers\Api\V1\RegisterController;
use App\Http\Controllers\Api\V1\SourceController;
use App\Http\Controllers\Api\V1\UpdateUserPasswordController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\UserFeedController;
use App\Http\Controllers\Api\V1\UserPreferenceController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Hello, World!']);
});

Route::post('register', RegisterController::class);

Route::post('login', LoginController::class);

Route::get('categories', CategoryController::class);

Route::get('authors', AuthorController::class);

Route::get('breaking-news', BreakingNewsController::class);

Route::get('news', NewsAggregatorController::class);

Route::get('sources', SourceController::class);

Route::group(['middleware' => 'auth:sanctum'], function () {
    /** Auth user */
    Route::get('auth', [UserController::class, 'index']);
    Route::patch('auth', [UserController::class, 'update']);
    Route::patch('password', UpdateUserPasswordController::class);
    Route::get('feeds', UserFeedController::class);
    Route::post('preferences', UserPreferenceController::class);
    Route::patch('logout', [UserController::class, 'delete']);

    // Categories
});
