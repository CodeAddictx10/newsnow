<?php

namespace App\Pipelines;

use Closure;
use Illuminate\Support\Facades\DB;

class PersistCategory
{
    public function __invoke(array $news, Closure $next)
    {
        $categories = collect($news)
            ->pluck('category')
            ->filter()
            ->map(fn ($categories) => trim($categories))
            ->unique()
            ->toArray();


        DB::table('categories')->upsert(
            array_map(fn ($category) => ['name' => $category], $categories),
            ['name'],
            ['name']
        );

        return $next($news);
    }
}
