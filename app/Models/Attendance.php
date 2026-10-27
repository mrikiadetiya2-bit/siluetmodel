<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = ['class_schedule_id', 'participant_id', 'marked_by', 'status', 'marked_at'];
    protected function casts(): array { return ['marked_at' => 'datetime']; }
    public function schedule(): BelongsTo { return $this->belongsTo(ClassSchedule::class, 'class_schedule_id'); }
    public function participant(): BelongsTo { return $this->belongsTo(Participant::class); }
}