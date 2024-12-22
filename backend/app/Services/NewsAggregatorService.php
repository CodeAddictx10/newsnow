<?php

namespace App\Services;

use App\Pipelines\PersistAuthor;
use App\Pipelines\PersistCategory;
use App\Pipelines\PersistNews;
use Illuminate\Support\Facades\Concurrency;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Pipeline;

class NewsAggregatorService 
{
  // get all news services and run a pipeline using the private method here
    public function scrapeNews()
    {
        $newsServices = config('app.news_providers.services', []);

        $results = Concurrency::run(function () use ($newsServices) {
            return collect($newsServices)->map(function ($service) {
                $service = new $service();
                return $service->fetchNews();
            })->toArray();
        });

        $news = collect($results)->flatten(2);

        $news->chunk(500)->each(fn($chunk) => Pipeline::send($chunk->toArray())
            ->through([
                PersistCategory::class,
                PersistAuthor::class,
                PersistNews::class,
            ])->thenReturn());
    }
}
