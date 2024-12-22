<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController
{
    /**
     * Get all categories
     */
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => Category::get()]);
    }
}
