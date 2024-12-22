<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController
{
    /**
     * Authenticate user
     * @param StoreLoginRequest $request
     * @return JsonResponse
     */
    public function __invoke(StoreLoginRequest $request): JsonResponse
    {
        if (Auth::attempt($request->safe()->only('email', 'password'))) {
            $request->session()->regenerate();

            return response()->json(['message' => 'Login success', 'data' => new UserResource($request->user())], 200);
        }
        
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
