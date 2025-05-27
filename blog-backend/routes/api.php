<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::prefix('api')->group(function () {
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/store' , [CategoryController::class,'store']);
        Route::post('/update/{id}', [CategoryController::class, 'update']);
        Route::delete('/delete/{id}', [CategoryController::class, 'delete']);
    });
});