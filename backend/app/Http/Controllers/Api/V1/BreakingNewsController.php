<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\NewsResource;
use App\Models\News;

class BreakingNewsController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return (new NewsResource(News::latest('published_at')->first()))->response();
    }
}
