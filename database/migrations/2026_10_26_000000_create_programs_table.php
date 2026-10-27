<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('duration');
            $table->unsignedBigInteger('price')->default(0);
            $table->unsignedInteger('enrolled')->default(0);
            $table->unsignedInteger('quota')->default(25);
            $table->string('mentor')->default('Tim Mentor Siluet');
            $table->string('status')->default('Aktif');
            $table->string('image')->default('/images/card_basic.jpg');
            $table->text('description')->nullable();
            $table->json('syllabus')->nullable();
            $table->json('perks')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};