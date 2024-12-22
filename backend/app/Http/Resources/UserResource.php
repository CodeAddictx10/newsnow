<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'preferences' => [
                'authors' => $this->whenLoaded('authors', function () {
                    return $this->authors->makeHidden('pivot');
                }),
                'categories' => $this->whenLoaded('categories', function () {
                    return $this->categories->makeHidden('pivot');
                }),
                'sources' => $this->whenLoaded('sources', function () {
                    return $this->sources->makeHidden('pivot');
                }),
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
