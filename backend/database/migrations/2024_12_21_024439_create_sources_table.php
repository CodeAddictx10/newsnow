<?php

use App\Enums\NewsSourceEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sources', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('key')->unique();
        });

        //insert default sources
       $source = collect(NewsSourceEnum::all())->map(function (string $source) {
            return [
                'name' => str($source)->title()->toString(),
                'key' => $source,
            ];
        })->toArray();
        
        DB::table('sources')->insert($source);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sources');
    }
};
