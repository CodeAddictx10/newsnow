<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreUserPreferenceRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

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

        $user->authors()->sync($data["authors"]);

        $user->sources()->sync($data["sources"]);

        $user->categories()->sync($data["categories"]);

        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
