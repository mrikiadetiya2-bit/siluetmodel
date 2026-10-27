<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mentor extends Model
{
    protected $fillable = ['user_id', 'name', 'title', 'bio', 'specialties', 'photo_path', 'active'];

    protected function casts(): array
    {
        return ['specialties' => 'array', 'active' => 'boolean'];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function schedules(): HasMany { return $this->hasMany(ClassSchedule::class); }
}