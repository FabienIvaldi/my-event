<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OpenDataSoftController extends Controller
{
    public function fetchData()
    {
        $url = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=title_fr%2Cimage%2C%20firstdate_begin%2Clocation_city%2Clocation_region%2Clocation_department%2Clocation_coordinates%2Cdescription_fr%2Clocation_address%2Clocation_postalcode%2Clocation_countrycode%2Clocation_image%2Cslug%2Ccategory&where=firstdate_begin%20%3E%20now()&limit=100';

        $response = Http::get($url);

        if ($response->successful()) {
            $data = $response->json();

            if (isset($data['results'])) {
                $events = $data['results'];
                return response()->json($events); 
            } else {
                return response()->json(['error' => 'Données introuvables'], 404);
            }
        } else {
            return response()->json(['error' => 'Échec de la réception des données du serveur'], $response->status());
        }
    }
}
