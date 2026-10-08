<?php

namespace App\Support\Demo;

/**
 * Data demo Bengkel (BENGKELKU): work order, kendaraan, sparepart, mekanik.
 * Kontrak status: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 * Work order selalu merujuk kendaraan + mekanik lewat ID mentah.
 */
class BengkelData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    private static function jt(int $value): int
    {
        return (int) round($value / 1000000);
    }

    /** Baris mentah mekanik (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function mekanikRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Agus Santoso',  'spesialisasi' => 'Mesin & Tune-up',     'pengalaman_tahun' => 10, 'telepon' => '0812-3456-7890'],
            ['id' => 2, 'nama' => 'Budi Prasetyo', 'spesialisasi' => 'Kelistrikan',          'pengalaman_tahun' => 7,  'telepon' => '0813-2345-6789'],
            ['id' => 3, 'nama' => 'Dedi Kurniawan','spesialisasi' => 'AC & Kaki-kaki',       'pengalaman_tahun' => 9,  'telepon' => '0815-6789-0123'],
            ['id' => 4, 'nama' => 'Eko Wijaya',   'spesialisasi' => 'Rem & Ban',            'pengalaman_tahun' => 6,  'telepon' => '0816-5432-1098'],
            ['id' => 5, 'nama' => 'Fajar Nugroho','spesialisasi' => 'Transmisi & Kopling',  'pengalaman_tahun' => 8,  'telepon' => '0817-1234-5678'],
        ];
    }

    /** Baris mentah kendaraan pelanggan. */
    private static function kendaraanRows(): array
    {
        return [
            ['id' => 1,  'plat' => 'B 1234 ABC', 'merk' => 'Toyota',     'tipe' => 'Avanza', 'tahun' => 2020, 'pemilik' => 'Hadi Gunawan',    'telepon' => '0812-1111-2222'],
            ['id' => 2,  'plat' => 'D 5678 DEF', 'merk' => 'Honda',      'tipe' => 'Brio',   'tahun' => 2022, 'pemilik' => 'Sinta Maharani',  'telepon' => '0813-3333-4444'],
            ['id' => 3,  'plat' => 'B 9012 GHI', 'merk' => 'Daihatsu',   'tipe' => 'Xenia',  'tahun' => 2019, 'pemilik' => 'Rudi Hartono',    'telepon' => '0815-5555-6666'],
            ['id' => 4,  'plat' => 'AB 3456 JKL','merk' => 'Suzuki',     'tipe' => 'Ertiga', 'tahun' => 2021, 'pemilik' => 'Dewi Lestari',    'telepon' => '0816-7777-8888'],
            ['id' => 5,  'plat' => 'B 7890 MNO', 'merk' => 'Toyota',     'tipe' => 'Innova', 'tahun' => 2018, 'pemilik' => 'Bambang Sutrisno','telepon' => '0817-9999-0000'],
            ['id' => 6,  'plat' => 'F 2345 PQR', 'merk' => 'Mitsubishi', 'tipe' => 'Xpander','tahun' => 2023, 'pemilik' => 'Maya Putri',      'telepon' => '0821-1234-5678'],
            ['id' => 7,  'plat' => 'B 6789 STU', 'merk' => 'Honda',      'tipe' => 'Jazz',   'tahun' => 2017, 'pemilik' => 'Andi Wijaya',     'telepon' => '0822-2345-6789'],
            ['id' => 8,  'plat' => 'D 1234 VWX', 'merk' => 'Nissan',     'tipe' => 'Livina', 'tahun' => 2016, 'pemilik' => 'Joko Prasetyo',   'telepon' => '0823-3456-7890'],
            ['id' => 9,  'plat' => 'B 4567 YZA', 'merk' => 'Toyota',     'tipe' => 'Calya',  'tahun' => 2021, 'pemilik' => 'Fitri Handayani', 'telepon' => '0821-4567-8901'],
            ['id' => 10, 'plat' => 'B 8901 BCD', 'merk' => 'Daihatsu',   'tipe' => 'Terios', 'tahun' => 2022, 'pemilik' => 'Hendra Gunawan',  'telepon' => '0822-5678-9012'],
        ];
    }

    /** Baris mentah stok sparepart. */
    private static function sparepartRows(): array
    {
        return [
            ['id' => 1,  'nama' => 'Oli Mesin 10W-40 4L',   'kategori' => 'Oli & Cairan', 'stok' => 24, 'satuan' => 'botol', 'harga' => 185000],
            ['id' => 2,  'nama' => 'Filter Oli',             'kategori' => 'Filter',       'stok' => 40, 'satuan' => 'pcs',   'harga' => 45000],
            ['id' => 3,  'nama' => 'Kampas Rem Depan',       'kategori' => 'Rem',          'stok' => 18, 'satuan' => 'set',   'harga' => 275000],
            ['id' => 4,  'nama' => 'Aki Kering 12V 45Ah',    'kategori' => 'Kelistrikan',  'stok' => 12, 'satuan' => 'pcs',   'harga' => 950000],
            ['id' => 5,  'nama' => 'Busi Iridium',           'kategori' => 'Pengapian',    'stok' => 60, 'satuan' => 'pcs',   'harga' => 85000],
            ['id' => 6,  'nama' => 'Filter Udara',           'kategori' => 'Filter',       'stok' => 35, 'satuan' => 'pcs',   'harga' => 65000],
            ['id' => 7,  'nama' => 'Ban 195/65 R15',         'kategori' => 'Ban',          'stok' => 16, 'satuan' => 'pcs',   'harga' => 625000],
            ['id' => 8,  'nama' => 'Shockbreaker Belakang',  'kategori' => 'Kaki-kaki',    'stok' => 8,  'satuan' => 'pcs',   'harga' => 475000],
            ['id' => 9,  'nama' => 'Timing Belt Set',        'kategori' => 'Mesin',        'stok' => 10, 'satuan' => 'set',   'harga' => 550000],
            ['id' => 10, 'nama' => 'Minyak Rem DOT4',        'kategori' => 'Oli & Cairan', 'stok' => 5,  'satuan' => 'botol', 'harga' => 75000],
        ];
    }

    private static function statusWo(string $key): array
    {
        return match ($key) {
            'antri'      => ['label' => 'Antri',      'tone' => 'warning'],
            'dikerjakan' => ['label' => 'Dikerjakan', 'tone' => 'info'],
            'selesai'    => ['label' => 'Selesai',    'tone' => 'success'],
            'batal'      => ['label' => 'Batal',      'tone' => 'destructive'],
            default      => ['label' => $key,         'tone' => 'info'],
        };
    }

    /** Baris mentah work order: merujuk kendaraan_id + mekanik_id. */
    private static function workorderRows(): array
    {
        return [
            ['id' => 1,  'no_wo' => 'WO-2026-0101', 'kendaraan_id' => 1,  'keluhan' => 'Ganti oli + tune-up berkala',  'mekanik_id' => 1, 'status' => 'selesai',    'estimasi' => 450000,  'tanggal' => '08 Okt 2026'],
            ['id' => 2,  'no_wo' => 'WO-2026-0102', 'kendaraan_id' => 2,  'keluhan' => 'AC tidak dingin',              'mekanik_id' => 3, 'status' => 'selesai',    'estimasi' => 650000,  'tanggal' => '08 Okt 2026'],
            ['id' => 3,  'no_wo' => 'WO-2026-0103', 'kendaraan_id' => 3,  'keluhan' => 'Rem bunyi saat mengerem',      'mekanik_id' => 4, 'status' => 'dikerjakan', 'estimasi' => 375000,  'tanggal' => '08 Okt 2026'],
            ['id' => 4,  'no_wo' => 'WO-2026-0104', 'kendaraan_id' => 4,  'keluhan' => 'Lampu depan mati',             'mekanik_id' => 2, 'status' => 'dikerjakan', 'estimasi' => 250000,  'tanggal' => '08 Okt 2026'],
            ['id' => 5,  'no_wo' => 'WO-2026-0105', 'kendaraan_id' => 5,  'keluhan' => 'Suara kasar dari mesin',       'mekanik_id' => 1, 'status' => 'antri',      'estimasi' => 850000,  'tanggal' => '08 Okt 2026'],
            ['id' => 6,  'no_wo' => 'WO-2026-0106', 'kendaraan_id' => 6,  'keluhan' => 'Ganti kampas rem + minyak rem','mekanik_id' => 4, 'status' => 'antri',      'estimasi' => 420000,  'tanggal' => '08 Okt 2026'],
            ['id' => 7,  'no_wo' => 'WO-2026-0107', 'kendaraan_id' => 7,  'keluhan' => 'Kopling selip',                'mekanik_id' => 5, 'status' => 'antri',      'estimasi' => 1200000, 'tanggal' => '08 Okt 2026'],
            ['id' => 8,  'no_wo' => 'WO-2026-0108', 'kendaraan_id' => 8,  'keluhan' => 'Ban aus, ganti 2 ban',         'mekanik_id' => 4, 'status' => 'selesai',    'estimasi' => 1300000, 'tanggal' => '07 Okt 2026'],
            ['id' => 9,  'no_wo' => 'WO-2026-0109', 'kendaraan_id' => 9,  'keluhan' => 'Servis berkala 40.000 km',     'mekanik_id' => 1, 'status' => 'selesai',    'estimasi' => 750000,  'tanggal' => '07 Okt 2026'],
            ['id' => 10, 'no_wo' => 'WO-2026-0110', 'kendaraan_id' => 10, 'keluhan' => 'Aki tekor, tidak bisa starter','mekanik_id' => 2, 'status' => 'batal',      'estimasi' => 0,       'tanggal' => '07 Okt 2026'],
            ['id' => 11, 'no_wo' => 'WO-2026-0111', 'kendaraan_id' => 2,  'keluhan' => 'Ganti oli + filter',           'mekanik_id' => 1, 'status' => 'antri',      'estimasi' => 350000,  'tanggal' => '08 Okt 2026'],
            ['id' => 12, 'no_wo' => 'WO-2026-0112', 'kendaraan_id' => 3,  'keluhan' => 'Spooring & balancing',         'mekanik_id' => 4, 'status' => 'dikerjakan', 'estimasi' => 300000,  'tanggal' => '08 Okt 2026'],
        ];
    }

    /** Work order diperkaya info kendaraan + mekanik. */
    public static function workorders(): array
    {
        $kendaraans = [];
        foreach (self::kendaraanRows() as $k) {
            $kendaraans[$k['id']] = $k;
        }
        $mekaniks = [];
        foreach (self::mekanikRows() as $m) {
            $mekaniks[$m['id']] = $m;
        }

        return array_map(function ($w) use ($kendaraans, $mekaniks) {
            $k = $kendaraans[$w['kendaraan_id']];
            return [
                'id'           => $w['id'],
                'no_wo'        => $w['no_wo'],
                'kendaraan'    => $k['plat'].' · '.$k['merk'].' '.$k['tipe'],
                'pemilik'      => $k['pemilik'],
                'keluhan'      => $w['keluhan'],
                'mekanik'      => $mekaniks[$w['mekanik_id']]['nama'],
                'tanggal'      => $w['tanggal'],
                'estimasi'     => $w['estimasi'],
                'estimasi_rp'  => self::rp($w['estimasi']),
                'status'       => self::statusWo($w['status']),
            ];
        }, self::workorderRows());
    }

    /** Kendaraan + riwayat servis (jumlah WO & servis terakhir). */
    public static function kendaraans(): array
    {
        $jumlah = [];
        $terakhir = [];
        foreach (self::workorderRows() as $w) {
            $id = $w['kendaraan_id'];
            $jumlah[$id] = ($jumlah[$id] ?? 0) + 1;
            $terakhir[$id] = $w['tanggal'];
        }

        return array_map(fn ($k) => [
            'id'              => $k['id'],
            'plat'            => $k['plat'],
            'merk'            => $k['merk'],
            'tipe'            => $k['tipe'],
            'tahun'           => $k['tahun'],
            'pemilik'         => $k['pemilik'],
            'telepon'         => $k['telepon'],
            'jumlah_servis'   => $jumlah[$k['id']] ?? 0,
            'servis_terakhir' => $terakhir[$k['id']] ?? '-',
        ], self::kendaraanRows());
    }

    /** Sparepart + penanda stok menipis. */
    public static function spareparts(): array
    {
        return array_map(fn ($s) => [
            'id'        => $s['id'],
            'nama'      => $s['nama'],
            'kategori'  => $s['kategori'],
            'stok'      => $s['stok'],
            'stok_teks' => $s['stok'].' '.$s['satuan'],
            'harga_rp'  => self::rp($s['harga']),
            'status'    => $s['stok'] <= 6
                ? ['label' => 'Stok Menipis', 'tone' => 'destructive']
                : ($s['stok'] <= 12
                    ? ['label' => 'Perlu Restock', 'tone' => 'warning']
                    : ['label' => 'Aman', 'tone' => 'success']),
        ], self::sparepartRows());
    }

    /** Mekanik + jumlah WO yang ditangani. */
    public static function mekaniks(): array
    {
        $aktif = [];
        $selesai = [];
        foreach (self::workorderRows() as $w) {
            $id = $w['mekanik_id'];
            if (in_array($w['status'], ['antri', 'dikerjakan'], true)) {
                $aktif[$id] = ($aktif[$id] ?? 0) + 1;
            }
            if ($w['status'] === 'selesai') {
                $selesai[$id] = ($selesai[$id] ?? 0) + 1;
            }
        }

        return array_map(fn ($m) => [
            'id'               => $m['id'],
            'nama'             => $m['nama'],
            'spesialisasi'     => $m['spesialisasi'],
            'pengalaman'       => $m['pengalaman_tahun'].' tahun',
            'telepon'          => $m['telepon'],
            'wo_aktif'         => $aktif[$m['id']] ?? 0,
            'wo_selesai'       => $selesai[$m['id']] ?? 0,
            'total_wo'         => ($aktif[$m['id']] ?? 0) + ($selesai[$m['id']] ?? 0),
        ], self::mekanikRows());
    }

    /** Sparepart yang perlu perhatian (stok tidak aman), untuk laporan. */
    public static function stokKritis(): array
    {
        return array_values(array_filter(
            self::spareparts(),
            fn ($s) => $s['status']['label'] !== 'Aman'
        ));
    }

    /** Ringkasan angka dashboard (dihitung dari data). */
    public static function ringkasan(): array
    {
        $rows = self::workorderRows();
        $aktif   = array_filter($rows, fn ($w) => in_array($w['status'], ['antri', 'dikerjakan'], true));
        $antri   = array_filter($rows, fn ($w) => $w['status'] === 'antri');
        $selesaiHariIni = array_filter($rows, fn ($w) => $w['status'] === 'selesai' && $w['tanggal'] === '08 Okt 2026');
        $omzet   = array_sum(array_map(
            fn ($w) => $w['status'] === 'selesai' ? $w['estimasi'] : 0,
            $rows
        ));

        return [
            'wo_aktif'         => count($aktif),
            'wo_antri'         => count($antri),
            'selesai_hari_ini' => count($selesaiHariIni),
            'omzet'            => $omzet,
            'omzet_rp'         => self::rp($omzet),
        ];
    }

    /** Jumlah WO per mekanik untuk bar chart. */
    public static function woPerMekanik(): array
    {
        $labels = [];
        $data   = [];
        foreach (self::mekaniks() as $m) {
            $labels[] = $m['nama'];
            $data[]   = $m['total_wo'];
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Work Order', 'data' => $data]],
        ];
    }

    /** Distribusi status WO untuk donut chart. */
    public static function distribusiStatus(): array
    {
        $keys = ['antri' => 'Antri', 'dikerjakan' => 'Dikerjakan', 'selesai' => 'Selesai', 'batal' => 'Batal'];
        $labels = [];
        $data   = [];
        foreach ($keys as $key => $label) {
            $labels[] = $label;
            $data[]   = count(array_filter(self::workorderRows(), fn ($w) => $w['status'] === $key));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Work Order', 'data' => $data]],
        ];
    }

    /** Omzet (juta Rp) WO selesai per bulan untuk area chart. */
    public static function omzetPerBulan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Omzet (juta Rp)', 'data' => [18, 22, 25, 21, 28, 24]]],
        ];
    }

    /** Nilai estimasi (juta Rp) WO aktif per mekanik untuk bar chart. */
    public static function bebanPerMekanik(): array
    {
        $labels = [];
        $data   = [];
        foreach (self::mekanikRows() as $m) {
            $total = 0;
            foreach (self::workorderRows() as $w) {
                if ($w['mekanik_id'] === $m['id'] && in_array($w['status'], ['antri', 'dikerjakan'], true)) {
                    $total += $w['estimasi'];
                }
            }
            $labels[] = $m['nama'];
            $data[]   = self::jt($total);
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Estimasi aktif (juta Rp)', 'data' => $data]],
        ];
    }
}
