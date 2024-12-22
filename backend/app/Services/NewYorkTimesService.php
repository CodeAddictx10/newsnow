<?php

namespace App\Services;

use App\Contracts\NewsProviderServiceInterface;
use App\Dtos\NewsDto;
use App\Enums\NewsSourceEnum;
use Illuminate\Support\Facades\Http;

class NewYorkTimesService implements NewsProviderServiceInterface
{
    /**
     * Fetch news from the provider.
     * @return array<NewsDto>
     */
    public function fetchNews()
    {
        $response = Http::get(config('app.news_providers.newyorktimes.url'). "/svc/topstories/v2/home.json", [
            'api-key' => config('app.news_providers.newyorktimes.key'),
          ]);

        if (!$response->ok()) {
            logger()->error('Failed to fetch news from The Guardians', ['response' => $response->json()]);
            return [];
        }
        
        $data = $response->json()['results'];
        return collect($data)->map(fn ($item) => $this->transformData($item))->toArray();
    }

    public function transformData(array $data): NewsDto
    {
        return  new NewsDto(
            title: $data['title'],
            description: $data['abstract'] ?? '',
            thumbnail: count($data['multimedia']) ? $data['multimedia'][0]['url'] : null,
            url: $data['url'],
            category: $data['section'] ?? null,
            source: NewsSourceEnum::NEWYORKTIMES,
            author: str($data['byline'])->replace('By', '')->toString() ?? null,
            published_at: $data['published_date'],
        );
    }
}
