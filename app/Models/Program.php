<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    protected $fillable = [
        'title', 'category', 'duration', 'price', 'enrolled', 'quota',
        'mentor', 'status', 'image', 'description', 'syllabus', 'perks',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'enrolled' => 'integer',
            'quota' => 'integer',
            'syllabus' => 'array',
            'perks' => 'array',
        ];
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function classSchedules(): HasMany
    {
        return $this->hasMany(ClassSchedule::class);
    }
}