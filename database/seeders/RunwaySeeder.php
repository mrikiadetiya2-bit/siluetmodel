<?php

namespace Database\Seeders;

use App\Models\PortalRecord;
use Illuminate\Database\Seeder;

class RunwaySeeder extends Seeder
{
    public function run(): void
    {
        $models = [
            [
                'name' => 'M. Fajar Shadiq',
                'role' => 'Putera Kebudayaan Kalsel 2024',
                'category' => 'Pageant & Runway',
                'lookTitle' => 'Sasirangan Heritage Blazer with Formal Inner',
                'lookDesc' => 'Blazer batik sasirangan modern tosca laut dipadu kemeja hitam formal dan selendang resmi Putera Kebudayaan Kalsel 2024.',
                'designer' => 'Siluet Etnik',
                'height' => '180 cm',
                'bookingText' => 'Konsultasi Booking Putera Kebudayaan',
                'image' => '/images/lineup/model_putera.png',
            ],
            [
                'name' => 'Marwa Al-Zahra',
                'role' => 'Professional Runway & Commercial Model',
                'category' => 'Smart Casual & Runway',
                'lookTitle' => 'Modern Tailored Cape Blazer with Belt Accent',
                'lookDesc' => 'Busana elegan serba putih aksen jubah modern dipadu hijab navy kontras dan ikat pinggang ramping emas.',
                'designer' => 'Siluet Signature',
                'height' => '174 cm',
                'bookingText' => 'Konsultasi Booking Model Runway',
                'image' => '/images/lineup/model_marwa_full.png',
            ],
            [
                'name' => 'Siti Nur Azizah',
                'role' => 'Wakil IV Galuh Kalimantan Selatan',
                'category' => 'Traditional Pageant',
                'lookTitle' => 'Busana Adat Sasirangan Galuh Banjar',
                'lookDesc' => 'Kebaya adat Banjar bertabur manik emas dengan kerudung selendang fuchsia bordir keemasan dan rok marun beludru.',
                'designer' => 'Giri Wangi & Siluet',
                'height' => '168 cm',
                'bookingText' => 'Konsultasi Booking Galuh Banjar',
                'image' => '/images/lineup/model_galuh.png',
            ],
            [
                'name' => 'Rian Pratama',
                'role' => 'Male Editorial & Fashion Week Alumni',
                'category' => 'Menswear & Commercial',
                'lookTitle' => 'Midnight Black Tailored Two-Piece Suit',
                'lookDesc' => 'Setelan jas pria modern fitted dengan kemeja putih klasik berkancing terbuka dan sepatu pantofel kulit mengkilap.',
                'designer' => 'Siluet Menswear',
                'height' => '182 cm',
                'bookingText' => 'Konsultasi Booking Male Model',
                'image' => '/images/lineup/model_suit.png',
            ],
            [
                'name' => 'Callysta Aurelia',
                'role' => 'Kids & Teen Modeling Prodigy',
                'category' => 'Kids Modeling School',
                'lookTitle' => 'Pastel Street Chic & Pleated Skirt',
                'lookDesc' => 'Jaket denim pastel pink dengan turtleneck rajut beige dan rok lipit ivory, dipadukan high-socks dan chunky heels youthful.',
                'designer' => 'Siluet Kids Wardrobe',
                'height' => '152 cm',
                'bookingText' => 'Konsultasi Booking Kids Model',
                'image' => '/images/lineup/model_kids.png',
            ],
        ];

        foreach ($models as $m) {
            PortalRecord::firstOrCreate(
                [
                    'type' => 'runway',
                    'data->name' => $m['name'],
                ],
                [
                    'type' => 'runway',
                    'status' => 'Aktif',
                    'data' => $m,
                ]
            );
        }
    }
}

