<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $privateApiUrl;
    
    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }
    
    public function index(Request $request)
    {
        $limit = $request->get('limit');
        $page = $request->get('page');
        
        $response = Http::get("{$this->privateApiUrl}/users", [
            'query' => [
                'page' => $page,
                'limit' => $limit,
                ]
            ]);
        return $response->json();
    }
        
    public function show(int $userId)
    {
        $response = Http::get("{$this->privateApiUrl}/users/{$userId}");
        if (isset($response['statusCode']) && $response['statusCode'] == 404) {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Headers: *");
            http_response_code(404);
            exit();
        }
        return $response->json();
    }
}
