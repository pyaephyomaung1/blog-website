<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::prefix('api')->group(function () {
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
    });
});