<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portal_records', function (Blueprint $table) {
            $table->id();
            $table->string('type')->index();
            $table->json('data');
            $table->string('status')->default('Aktif')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portal_records');
    }
};