<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "url" => $this->url,
            "thumbnail" => $this->thumbnail,
            "category" => $this->whenLoaded('category'),
            "source" => $this->whenLoaded('source'),
            "author" => $this->whenLoaded('author'),
            "published_at" => $this->published_at
        ];
    }
}
