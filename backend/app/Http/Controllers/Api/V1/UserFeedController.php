<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserFeedController
{
    /**
     * Get all news based on user preferences
     */
    public function __invoke(Request $request): JsonResponse
    {
        /** @param User $user */
        $user = $request->user()->load('categories', 'authors', 'sources');

        $data = QueryBuilder::for(News::class)
        ->allowedFilters([
            'title',
            AllowedFilter::callback('published_at', fn (Builder $query, string $value) => $query->whereDate('published_at', Carbon::parse($value)->format('Y-m-d H:i:s'))),
            AllowedFilter::exact('source_id'),
            AllowedFilter::exact('author_id'),
            AllowedFilter::exact('category_id'),
        ])
        ->with('source', 'author', 'category')
        ->where(function (Builder $query) use ($user) {
            $query->when(count($user->authors), fn (Builder $query) => $query->whereIn('author_id', collect($user->authors)->pluck('id')->toArray()))
            ->when(count($user->sources), fn (Builder $query) => $query->orWhereIn('source_id', collect($user->sources)->pluck('id')->toArray()))
            ->when(count($user->categories), fn (Builder $query) => $query->whereIn('category_id', collect($user->categories)->pluck('id')->toArray()));
        })
        ->latest('published_at')
        ->cursorPaginate($request->get('per_page', 25));

        return NewsResource::collection($data)->response();
    }
}
