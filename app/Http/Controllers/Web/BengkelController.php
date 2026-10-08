<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\BengkelData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman Bengkel (Inertia). */
class BengkelController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('bengkel/index', [
            'ringkasan'  => BengkelData::ringkasan(),
            'chart'      => BengkelData::woPerMekanik(),
            'workorders' => array_slice(BengkelData::workorders(), 0, 6),
        ]);
    }

    public function workorder(): Response
    {
        return Inertia::render('bengkel/workorder', [
            'workorders' => BengkelData::workorders(),
        ]);
    }

    public function kendaraan(): Response
    {
        return Inertia::render('bengkel/kendaraan', [
            'kendaraans' => BengkelData::kendaraans(),
        ]);
    }

    public function sparepart(): Response
    {
        return Inertia::render('bengkel/sparepart', [
            'spareparts' => BengkelData::spareparts(),
        ]);
    }

    public function mekanik(): Response
    {
        return Inertia::render('bengkel/mekanik', [
            'mekaniks' => BengkelData::mekaniks(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('bengkel/laporan', [
            'ringkasan'  => BengkelData::ringkasan(),
            'perMekanik' => BengkelData::woPerMekanik(),
            'distribusi' => BengkelData::distribusiStatus(),
            'perBulan'   => BengkelData::omzetPerBulan(),
            'beban'      => BengkelData::bebanPerMekanik(),
            'stokKritis' => BengkelData::stokKritis(),
        ]);
    }
}
