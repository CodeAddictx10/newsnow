<?php

namespace App\Dtos;

use App\Enums\NewsSourceEnum;
use Spatie\LaravelData\Data;

class NewsDto extends Data 
{
public function __construct(
        public string $title,
        public string $description,
        public ?string $thumbnail,
        public string $url,
        public ?string $category,
        public NewsSourceEnum $source,
        public ?string $author,
        public string $published_at
    ) {
    }
}
