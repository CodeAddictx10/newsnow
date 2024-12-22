<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Source;
use Illuminate\Http\JsonResponse;

class SourceController
{
    /**
     * Get all sources
     */
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => Source::get(['id', 'name'])]);
    }
}
