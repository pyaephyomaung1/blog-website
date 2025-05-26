<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Interfaces\CategoryInterface;
use App\Repository\CategoryRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            CategoryInterface::class,
            CategoryRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Route::prefix('api')
            ->group(base_path('routes/api.php'));
    }
}
