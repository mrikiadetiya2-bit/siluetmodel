<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortalRecord extends Model
{
    protected $fillable = ['type', 'data', 'status'];

    protected function casts(): array
    {
        return ['data' => 'array'];
    }
}