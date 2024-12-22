<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserPreferenceRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserPreferenceController
{
    /**
     * @param StoreUserPreferenceRequest $request
     */
    public function __invoke(StoreUserPreferenceRequest $request): JsonResponse
    {
        $data = $request->validated();

        /** @var User $user */
        $user = $request->user();
        if(count($data["authors"])){
            $user->authors()->sync($data["authors"]);
        }

        if(count($data["sources"])){
            $user->sources()->sync($data["sources"]);
        }

        if(count($data["categories"])){
            $user->categories()->sync($data["categories"]);
        }

        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
