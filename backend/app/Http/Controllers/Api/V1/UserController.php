<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserInformationRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController
{
    /**
     * Get the authenticated User.
     */
    public function index(Request $request): JsonResponse
    {
        return (new UserResource($request->user()->load('sources', 'authors', 'categories')))->response();
    }

    /**
     * Update user information
     */
    public function update(UpdateUserInformationRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth('sanctum')->user();
        $user->update($request->validated());
        return response()->json(['message' => 'User information updated successfully']);
    }

    /**
     * Logout user
     */
    public function destroy()
    {
        auth('sanctum')->logout();
        return response()->noContent();
    }
}
