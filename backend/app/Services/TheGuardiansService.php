<?php

namespace App\Services;

use App\Contracts\NewsProviderServiceInterface;
use App\Dtos\NewsDto;
use App\Enums\NewsSourceEnum;
use Illuminate\Support\Facades\Http;

class TheGuardiansService implements NewsProviderServiceInterface
{
    /**
     * Fetch news from the provider.
     * @return array<NewsDto>
     */
    public function fetchNews()
    {
        $response = Http::withHeaders([
            'api-key' => config('app.news_providers.theguardians.key'),
          ])
          ->get(config('app.news_providers.theguardians.url'). "/search", [
              'format' => 'json',
              'show-tags' => 'contributor',
              'show-fields' => 'thumbnail,trailText',
              'page-size' => 100,
          ]);

        if (!$response->ok()) {
            logger()->error('Failed to fetch news from The Guardians', ['response' => $response->json()]);
            return [];
        }

        $data = $response->json()['response']['results'];
        return collect($data)->map(fn ($item) => $this->transformData($item))->toArray();
    }

    public function transformData(array $data): NewsDto
    {
        return  new NewsDto(
            title: $data['webTitle'],
            description: $data['fields']['trailText'] ?? '',
            thumbnail: $data['fields']['thumbnail'] ?? null,
            url: $data['webUrl'],
            category: $data['sectionName'] ?? null,
            source: NewsSourceEnum::THE_GUARDIANS,
            author: count($data['tags']) ? $data['tags'][0]['webTitle'] : null,
            published_at: $data['webPublicationDate'],
        );
    }
}
