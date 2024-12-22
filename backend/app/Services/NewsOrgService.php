<?php

namespace App\Services;

use App\Contracts\NewsProviderServiceInterface;
use App\Dtos\NewsDto;
use App\Enums\NewsSourceEnum;
use Illuminate\Support\Facades\Http;

class NewsOrgService implements NewsProviderServiceInterface
{
    /**
     * Fetch news from the provider.
     * @return array<NewsDto>
     */
    public function fetchNews()
    {
        $response = Http::withHeaders([
            'X-Api-Key' => config('app.news_providers.newsorg.key'),
          ])
          ->get(config('app.news_providers.newsorg.url'). "/v2/top-headlines?", [
            'language' => 'en',
              'sortBy' => 'popularity',
              'pageSize' => 100,
          ]);

        if (!$response->ok()) {
            logger()->error('Failed to fetch news from The Guardians', ['response' => $response->json()]);
            return [];
        }

        $data = $response->json()['articles'];
        return collect($data)->map(fn ($item) => $this->transformData($item))->toArray();
    }

    public function transformData(array $data): NewsDto
    {
        return  new NewsDto(
            title: $data['title'],
            description: $data['description'] ?? '',
            thumbnail: $data['urlToImage'] ?? null,
            url: $data['url'],
            category: null,
            source: NewsSourceEnum::NEWSORG,
            author: $data['author'] ?? null,
            published_at: $data['publishedAt'],
        );
    }
}
