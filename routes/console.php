<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Models\ClassSchedule;
use Illuminate\Support\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('classes:reschedule-missed', function () {
    $moved = 0;
    ClassSchedule::query()
        ->where('status', 'scheduled')
        ->where('ends_at', '<', now())
        ->whereDoesntHave('attendances')
        ->orderBy('id')
        ->chunkById(100, function ($schedules) use (&$moved) {
            foreach ($schedules as $schedule) {
                $start = Carbon::parse($schedule->starts_at);
                $end = Carbon::parse($schedule->ends_at);
                do {
                    $start->addWeek();
                    $end->addWeek();
                } while ($end->lte(now()));

                $schedule->update(['starts_at' => $start, 'ends_at' => $end]);
                $moved++;
            }
        });

    $this->info("Jadwal terlewat yang dipindahkan: {$moved}");
})->purpose('Pindahkan jadwal kelas terlewat ke minggu berikutnya');

Schedule::command('classes:reschedule-missed')->dailyAt('00:05')->withoutOverlapping();
