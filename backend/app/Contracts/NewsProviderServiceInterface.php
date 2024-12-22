<?php

namespace App\Contracts;

use App\Dtos\NewsDto;

interface NewsProviderServiceInterface
{
    /**
     * Fetch news from the provider
     * @return array<NewsDto>
     */
    public function fetchNews();

    /**
     * Transform the data from the provider to NewsDto
     * @param array $data
     * @return NewsDto
     */
    public function transformData(array $data): NewsDto;
}
