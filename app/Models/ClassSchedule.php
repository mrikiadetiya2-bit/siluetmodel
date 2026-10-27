<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClassSchedule extends Model
{
    protected $fillable = ['program_id', 'mentor_id', 'starts_at', 'ends_at', 'location', 'capacity', 'status'];

    protected function casts(): array { return ['starts_at' => 'datetime', 'ends_at' => 'datetime']; }
    public function program(): BelongsTo { return $this->belongsTo(Program::class); }
    public function mentor(): BelongsTo { return $this->belongsTo(Mentor::class); }
    public function attendances(): HasMany { return $this->hasMany(Attendance::class); }
}