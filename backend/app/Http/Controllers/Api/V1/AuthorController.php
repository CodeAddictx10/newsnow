<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\JsonResponse;

class AuthorController
{
    /**
     * Get all authors
     */
    public function __invoke(): JsonResponse
    {
        return response()->json(['data' => Author::get()]);
    }
}
