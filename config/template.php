<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "bengkel".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'bengkel'),

    'flavors' => array (
  'bengkel' => 
  array (
    'label' => 'Bengkel',
    'brand_name' => 'BENGKELKU',
    'brand_tagline' => 'Work order bengkel',
    'brand_initials' => 'BE',
    'accent' => '#78350f',
    'category' => 'jasa',
    'home' => 'bengkel.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Bengkel',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/bengkel',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Work Order',
              'to' => '/bengkel/workorder',
              'icon' => 'Wrench',
            ),
            2 => 
            array (
              'label' => 'Kendaraan',
              'to' => '/bengkel/kendaraan',
              'icon' => 'Car',
            ),
            3 => 
            array (
              'label' => 'Sparepart',
              'to' => '/bengkel/sparepart',
              'icon' => 'Cog',
            ),
            4 => 
            array (
              'label' => 'Mekanik',
              'to' => '/bengkel/mekanik',
              'icon' => 'Users',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/bengkel/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
