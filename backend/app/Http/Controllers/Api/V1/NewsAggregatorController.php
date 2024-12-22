<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\NewsResource;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class NewsAggregatorController
{
    /**
     * Get all news
     */
    public function __invoke(Request $request): JsonResponse
    {
        $data = QueryBuilder::for(News::class)
        ->allowedFilters([
            'title',
             AllowedFilter::callback('published_at', fn (Builder $query, string $value) => $query->whereDate('published_at', Carbon::parse($value)->format('Y-m-d H:i:s'))),
            AllowedFilter::exact('source_id'),
            AllowedFilter::exact('author_id'),
            AllowedFilter::exact('category_id'),
        ])
        ->with('source', 'author', 'category')
        ->latest('published_at')
        ->cursorPaginate($request->get('per_page', 25));

        return NewsResource::collection($data)->response();
    }
}
