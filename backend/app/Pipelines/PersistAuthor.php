<?php

namespace App\Pipelines;

use Closure;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class PersistAuthor
{
    public function __invoke(array $news, Closure $next)
    {
        $authors = collect($news)
            ->pluck('author')
            ->filter()
            ->flatMap(function ($author) {
                $author = preg_replace('/^Produced by\s*/i', '', $author);
                return preg_split('/,\s*| and /i', $author);
            })
            ->map(fn ($author) => trim($author))
            ->filter()
            ->unique()
            ->toArray();

        DB::table('authors')->upsert(
            array_map(fn ($author) => ['name' => $author], $authors),
            ['name'],
            ['name']
        );

        return $next($news);
    }
}
