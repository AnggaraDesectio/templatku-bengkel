<?php

use App\Http\Controllers\Web\BengkelController;
use Illuminate\Support\Facades\Route;

Route::prefix('bengkel')->name('bengkel.')->group(function () {
    Route::get('/', [BengkelController::class, 'index'])->name('index');
    Route::get('/workorder', [BengkelController::class, 'workorder'])->name('workorder');
    Route::get('/kendaraan', [BengkelController::class, 'kendaraan'])->name('kendaraan');
    Route::get('/sparepart', [BengkelController::class, 'sparepart'])->name('sparepart');
    Route::get('/mekanik', [BengkelController::class, 'mekanik'])->name('mekanik');
    Route::get('/laporan', [BengkelController::class, 'laporan'])->name('laporan');
});
