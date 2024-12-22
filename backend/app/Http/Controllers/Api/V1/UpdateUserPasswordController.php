<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\UpdateUserPasswordRequest;

class UpdateUserPasswordController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateUserPasswordRequest $request)
    {
        $user = $request->user();
        $user->update($request->safe()->only('password'));
        return response()->json(['message' => 'Password updated successfully']);
    }
}
