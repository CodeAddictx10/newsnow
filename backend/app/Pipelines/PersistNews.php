<?php

namespace App\Pipelines;

use Closure;
use Illuminate\Support\Facades\DB;

class PersistNews
{
    public function __invoke(array $news, Closure $next)
    {
        $categories = DB::table('categories')->get()->keyBy(fn ($item) => strtolower($item->name));
        $authors = DB::table('authors')->get()->keyBy(fn ($item) => strtolower($item->name));
        $sources = DB::table('sources')->get()->keyBy(fn ($item) => strtolower($item->key));

        $news = collect($news)
        ->filter(fn ($item) => $item['title'] != "[Removed]")
        ->map(fn ($item) => [
            'title' => $item['title'],
            'description' => $item['description'],
            'thumbnail' => $item['thumbnail'],
            'url' => $item['url'],
            'category_id' => $item['category'] ? $categories->get(strtolower($item['category']))?->id : null,
            'source_id' => $sources->get(strtolower($item['source']))?->id,
            'author_id' => $item['author'] ? $authors->get($this->getFirstAuthor($item['author']))?->id : null,
            'published_at' => rtrim(str_replace(['T', 'Z'], ' ', $item['published_at'])),
            'created_at' => now(),
            'updated_at' => now(),
        ])->toArray();

        DB::table('news')->upsert(
            $news,
            ['url', 'title'],
            ['title', 'description', 'thumbnail', 'category_id', 'source_id', 'author_id', 'published_at', 'created_at', 'updated_at']
        );
        return $next(true);
    }

    private function getFirstAuthor(string $authors): string
    {
        $author = preg_replace('/^Produced by\s*/i', '', $authors);
        $parsed = preg_split('/,\s*| and /i', $author);
        trim(
            trim(strtolower($parsed[0] ?? $authors))
        );
        return trim(strtolower($parsed[0] ?? $authors));
    }
}
