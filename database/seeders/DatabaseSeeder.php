<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\ClassSchedule;
use App\Models\Enrollment;
use App\Models\Mentor;
use App\Models\Participant;
use App\Models\Payment;
use App\Models\PortalRecord;
use App\Models\Program;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin Account
        $email = env('ADMIN_EMAIL', 'admin@siluetmodel.com');
        $password = env('ADMIN_PASSWORD', 'admin123_');
        $name = env('ADMIN_NAME', 'Administrator');

        $admin = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => 'admin',
            ]
        );
        if ($admin->role !== 'admin') {
            $admin->update(['role' => 'admin']);
        }
        $this->command?->info("Admin account: {$admin->email}");

        // 2. Settings Record
        PortalRecord::updateOrCreate(
            ['type' => 'settings'],
            [
                'status' => 'Aktif',
                'data' => [
                    'name' => 'Siluet Model Tala Academy',
                    'tagline' => 'Shape Your Presence, Own the Runway',
                    'email' => 'info@siluetmodeltala.com',
                    'phone' => '+62 21 555-0199',
                    'whatsapp' => '+62 812-3456-7890',
                    'address' => 'Jl. Senopati Fashion District No. 88, Kebayoran Baru, Jakarta Selatan',
                    'bcaAccount' => '8830-1928-33 (a.n. PT Siluet Model Tala)',
                    'mandiriAccount' => '137-00-9821-445 (a.n. PT Siluet Model Tala)',
                ],
            ]
        );

        // 3. Mentors
        $mentorData = [
            [
                'name' => 'Victoria Sandra',
                'title' => 'Head of Runway Choreography',
                'bio' => 'Mantan model internasional yang telah mengarahkan lebih dari 80 peragaan busana besar di Jakarta, Singapore, dan Milan. Terkenal dengan metode pelatihannya yang presisi dan membangun karakter panggung yang tak terlupakan.',
                'specialties' => ['Catwalk Rhythm', 'Haute Couture Posture', 'Stage Confidence'],
                'photo_path' => 'images/site/card_runway.png',
                'active' => true,
            ],
            [
                'name' => 'Bintang Daniswara',
                'title' => 'Editorial Posing & Creative Director',
                'bio' => 'Fotografer & Creative Director kenamaan yang karyanya menghiasi sampul majalah Elle, Harper’s Bazaar, dan Marie Claire. Membimbing murid memahami psikologi kamera dan visual angle.',
                'specialties' => ['High Fashion Angles', 'Micro-Expression', 'Studio Lighting Interaction'],
                'photo_path' => 'images/site/card_basic.png',
                'active' => true,
            ],
            [
                'name' => 'Rachel Wijaya',
                'title' => 'Commercial Acting & Talent Branding',
                'bio' => 'Bintang iklan lebih dari 100 produk nasional dan pelatih akting komersial. Membantu model mengasah vokal, kontak mata, dan daya tarik natural yang sangat dicari sutradara iklan.',
                'specialties' => ['TV Commercial Screen Test', 'Monologue', 'Digital Personal Branding'],
                'photo_path' => 'images/site/card_commercial.png',
                'active' => true,
            ],
            [
                'name' => 'Hendra Setiadi',
                'title' => 'Talent Scout & Career Strategist',
                'bio' => 'Pemandu bakat senior yang memiliki jaringan luas dengan agensi model papan atas di Tokyo, Seoul, dan Paris. Mempersiapkan mental dan negosiasi kontrak murid Siluet Tala.',
                'specialties' => ['Agency Contracts', 'Portfolio Packaging', 'Global Career Placement'],
                'photo_path' => 'images/site/card_advanced.png',
                'active' => true,
            ],
        ];

        foreach ($mentorData as $m) {
            Mentor::firstOrCreate(['name' => $m['name']], $m);
        }

        // 4. Testimonials
        $testimonials = [
            [
                'name' => 'Nadia Putri',
                'role' => 'Alumni Basic Modeling 2024',
                'quote' => 'Pelatihannya sangat profesional dan membantu saya lebih percaya diri. Sekarang saya sudah mendapatkan kesempatan untuk ikut fashion show dan photoshoot komersial.',
                'avatar' => '/images/site/avatar_nadia.png',
                'rating' => 5,
                'featuredOnHome' => true,
                'date' => '14 Jan 2025',
            ],
            [
                'name' => 'Jessica Tania',
                'role' => 'Alumni Runway & Catwalk 2024',
                'quote' => 'Kurikulum runway & catwalk di Siluet Model Tala benar-benar mengubah cara saya berjalan dan postur tubuh. Mentornya sangat sabar dan detail dalam memberi evaluasi.',
                'avatar' => '/images/site/card_commercial.png',
                'rating' => 5,
                'featuredOnHome' => true,
                'date' => '02 Feb 2025',
            ],
            [
                'name' => 'Aura Clarissa',
                'role' => 'Alumni Advanced Modeling 2023',
                'quote' => 'Networking yang dibangun Siluet Model Tala sangat membantu karier saya. Setelah lulus, saya langsung terhubung dengan dua agensi fashion ternama di Jakarta.',
                'avatar' => '/images/site/card_advanced.png',
                'rating' => 5,
                'featuredOnHome' => true,
                'date' => '20 Feb 2025',
            ],
            [
                'name' => 'Adrian Pratama',
                'role' => 'Alumni Male Modeling 2024',
                'quote' => 'Kelasnya fokus dan intensif. Dari yang tadinya canggung di depan kamera, kini saya sudah dipercaya menjadi model kampanye fashion pria nasional.',
                'avatar' => '/images/site/card_basic.png',
                'rating' => 5,
                'featuredOnHome' => false,
                'date' => '05 Mar 2025',
            ],
        ];

        foreach ($testimonials as $testi) {
            PortalRecord::firstOrCreate(
                [
                    'type' => 'testimonial',
                    'data->name' => $testi['name'],
                ],
                [
                    'type' => 'testimonial',
                    'status' => 'Aktif',
                    'data' => $testi,
                ]
            );
        }

        // 5. Gallery Records
        $galleryItems = [
            [
                'title' => 'Jakarta Fashion Week 2025 Opening Gala',
                'category' => 'Fashion Show',
                'designer' => 'Sebastian Gunawan Couture',
                'image' => '/images/site/card_runway.png',
                'date' => '15/10/2025',
                'description' => 'Penampilan runway haute couture alumni Siluet Model Tala di Jakarta Fashion Week.',
            ],
            [
                'title' => 'Harper’s Bazaar Indonesia Editorial Cover',
                'category' => 'Photoshoot Studio',
                'designer' => 'Biyan Wanaatmadja',
                'image' => '/images/site/card_basic.png',
                'date' => '22/09/2025',
                'description' => 'Sesi pemotretan editorial sampul majalah bersama fotografer mode senior.',
            ],
            [
                'title' => 'Masterclass Posing & Micro-Expression',
                'category' => 'Masterclass',
                'designer' => 'Siluet Model Tala Academy',
                'image' => '/images/site/card_advanced.png',
                'date' => '08/08/2025',
                'description' => 'Workshop intensif ekspresi mikro kamera studio bersama mentor internasional.',
            ],
            [
                'title' => 'Wisuda & Runway Showcase Angkatan 12',
                'category' => 'Wisuda Alumni',
                'designer' => 'Graduation Class 2025',
                'image' => '/images/site/card_commercial.png',
                'date' => '01/07/2025',
                'description' => 'Momen kelulusan siswa akademi lengkap dengan peragaan busana kelulusan.',
            ],
        ];

        foreach ($galleryItems as $item) {
            PortalRecord::firstOrCreate(
                [
                    'type' => 'gallery',
                    'data->title' => $item['title'],
                ],
                [
                    'type' => 'gallery',
                    'status' => 'Aktif',
                    'data' => $item,
                ]
            );
        }

        // 6. Programs (Make sure programs 1-4 exist)
        $programs = Program::all();
        if ($programs->isEmpty()) {
            $defaultPrograms = [
                ['title' => 'Basic Modeling Intensive', 'category' => 'Basic Modeling', 'duration' => '8 Minggu', 'price' => 2500000, 'quota' => 20, 'status' => 'Aktif', 'image' => '/images/site/card_basic.png', 'description' => 'Untuk pemula yang ingin membangun dasar dan postur dunia modeling.'],
                ['title' => 'Advanced Editorial & Runway', 'category' => 'Advanced Modeling', 'duration' => '10 Minggu', 'price' => 3500000, 'quota' => 15, 'status' => 'Aktif', 'image' => '/images/site/card_advanced.png', 'description' => 'Tingkatkan kemampuan pose, catwalk tingkat tinggi, dan personal branding.'],
                ['title' => 'Commercial TVC & Audition', 'category' => 'Commercial Modeling', 'duration' => '6 Minggu', 'price' => 3000000, 'quota' => 18, 'status' => 'Aktif', 'image' => '/images/site/card_commercial.png', 'description' => 'Persiapan photoshoot produk, video iklan komersial, dan casting agensi.'],
                ['title' => 'Runway & High Fashion Catwalk', 'category' => 'Runway & Catwalk', 'duration' => '8 Minggu', 'price' => 3200000, 'quota' => 15, 'status' => 'Aktif', 'image' => '/images/site/card_runway.png', 'description' => 'Latihan teknik berjalan di runway bersama mentor berprestasi internasional.'],
            ];
            foreach ($defaultPrograms as $dp) {
                Program::create($dp);
            }
            $programs = Program::all();
        }

        // 7. Sample Students & Enrollments
        $students = [
            ['name' => 'Nadia Putri', 'email' => 'nadia.putri@gmail.com', 'phone' => '081234567891'],
            ['name' => 'Jessica Tania', 'email' => 'jessica.tania@gmail.com', 'phone' => '081234567892'],
            ['name' => 'Aura Clarissa', 'email' => 'aura.clarissa@gmail.com', 'phone' => '081234567893'],
            ['name' => 'Adrian Pratama', 'email' => 'adrian.pratama@gmail.com', 'phone' => '081234567894'],
            ['name' => 'Sophia Ardelia', 'email' => 'sophia.ardelia@gmail.com', 'phone' => '081234567895'],
        ];

        $prog1 = $programs->first();
        $prog2 = $programs->skip(1)->first() ?? $prog1;

        foreach ($students as $index => $s) {
            $user = User::firstOrCreate(
                ['email' => $s['email']],
                ['name' => $s['name'], 'password' => Hash::make('password123'), 'role' => 'peserta']
            );

            $participant = Participant::firstOrCreate(
                ['user_id' => $user->id],
                ['phone' => $s['phone']]
            );

            $programToEnroll = ($index % 2 === 0) ? $prog1 : $prog2;

            $status = $index === 0 ? 'completed' : ($index < 3 ? 'confirmed' : 'pending');
            $payStatus = $index < 3 ? 'paid' : 'pending';

            $enrollment = Enrollment::firstOrCreate(
                [
                    'participant_id' => $participant->id,
                    'program_id' => $programToEnroll->id,
                ],
                [
                    'status' => $status,
                    'enrolled_at' => Carbon::now()->subDays(15 - $index * 2),
                ]
            );

            Payment::firstOrCreate(
                ['enrollment_id' => $enrollment->id],
                [
                    'invoice' => 'INV-' . Carbon::now()->year . '-' . str_pad($enrollment->id, 4, '0', STR_PAD_LEFT),
                    'amount' => $programToEnroll->price,
                    'status' => $payStatus,
                    'provider' => 'Bank Transfer BCA',
                    'paid_at' => $payStatus === 'paid' ? Carbon::now()->subDays(14 - $index * 2) : null,
                ]
            );
        }

        // 8. Class Schedules
        $mentor1 = Mentor::first();
        $mentor2 = Mentor::skip(1)->first() ?? $mentor1;

        if ($mentor1 && $prog1) {
            ClassSchedule::firstOrCreate(
                [
                    'program_id' => $prog1->id,
                    'mentor_id' => $mentor1->id,
                    'location' => 'Studio Utama Lt. 2 - Senopati',
                ],
                [
                    'starts_at' => Carbon::now()->addDays(2)->setTime(10, 0, 0),
                    'ends_at' => Carbon::now()->addDays(2)->setTime(12, 30, 0),
                    'capacity' => 20,
                    'status' => 'scheduled',
                ]
            );
        }

        if ($mentor2 && $prog2) {
            ClassSchedule::firstOrCreate(
                [
                    'program_id' => $prog2->id,
                    'mentor_id' => $mentor2->id,
                    'location' => 'Studio Runway Hall A',
                ],
                [
                    'starts_at' => Carbon::now()->addDays(4)->setTime(14, 0, 0),
                    'ends_at' => Carbon::now()->addDays(4)->setTime(17, 0, 0),
                    'capacity' => 15,
                    'status' => 'scheduled',
                ]
            );
        }

        $this->command?->info('Seeding completed successfully!');
    }
}
