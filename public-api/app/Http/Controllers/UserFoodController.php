<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Exception;

class UserFoodController extends Controller
{
    private $privateApiUrl;

    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }

    public function foods(int $userId)
    {
        try {
            $response = Http::get("{$this->privateApiUrl}/users/{$userId}/foods");
            if(isset($response['statusCode'])) {
                if($response['statusCode'] == 404) {
                    http_response_code(404);
                    return $response->json('User Not Found', 404);
                } else if($response['statusCode'] != 200) {
                    return $respons->json('Network Error', 500);
                }
            }
            return $response->json();
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function food(int $userId, int $foodId)
    {
        try {
            $response = Http::get("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}");
            return $response->json();
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteFood(int $userId, int $foodId)
    {
        try {
            $response = Http::delete("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}");
            return $response->json();
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function addFood(Request $request, int $userId, int $foodId)
    {
        $servingsPerWeek = $request->input('servingsPerWeek');
        try {
            $response = Http::put("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}", [
                'servingsPerWeek' => $servingsPerWeek
            ]);
            return $response->json();
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
