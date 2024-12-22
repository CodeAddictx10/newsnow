<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegisterRequestRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegisterController
{
    /**
     * Register new account
     * @param StoreRegisterRequestRequest $request
     * @return JsonResponse
     */
    public function __invoke(StoreRegisterRequestRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            User::create($data);
            return response()->json(['message' => 'Register success'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Register failed, please try again'], 500);
        }
    }
}
