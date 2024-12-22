<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description')->nullable();
            $table->string('url')->unique();
            $table->mediumText('thumbnail')->nullable();
            $table->foreignId('category_id')->nullable()
            ->constrained('categories')
            ->nullOnDelete();
            $table->foreignId('source_id')->nullable()
            ->constrained('sources')
            ->nullOnDelete();
            $table->foreignId('author_id')->nullable()
            ->constrained('authors')
            ->nullOnDelete();
            $table->timestamp('published_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
