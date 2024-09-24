<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class EventPage extends Controller
{
    public function fetchData($slug)
    {
        $request_limit = 100;
        $start = 0;
        $found = false;
        $result = null;

        do {
            // URL avec les paramètres "limit" et "start"
            $url = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=image%2Ctitle_fr%2Clongdescription_fr%2Cfirstdate_begin%2Clocation_name%2C%20location_address%2C%20location_district%2Clocation_insee%2Clocation_postalcode%2Clocation_city%2Clocation_department%2Clocation_region%2Clocation_countrycode%2C%20location_image%2Clocation_imagecredits%2Clocation_coordinates%2Clocation_phone%2Clocation_website%2Clocation_links%2Clocation_tags%2Clocation_description_fr%2Cslug%2Clocation_access_fr%2Cage_min%2Cage_max%2Cuid&limit=' . $request_limit . '&start=' . $start;

            // Requête HTTP
            $response = Http::get($url);

            // Vérification si la requête est réussie
            if ($response->successful()) {
                $data = $response->json();
                $events = $data['results'];

                // Rechercher l'événement correspondant au slug
                foreach ($events as $event) {
                    if ($event['slug'] === $slug) {
                        $result = $event;
                        $found = true;
                        break; // Arrêter la boucle une fois que le slug est trouvé
                    }
                }

                // Si aucun événement n'est trouvé, augmenter "start"
                if (!$found) {
                    $start += $request_limit;
                }
            } else {
                // En cas d'échec de la requête
                return null;
            }
        } while (!$found && count($events) > 0); // Continuer tant que le slug n'est pas trouvé et qu'il y a des événements

        return $result; // Retourne l'événement correspondant au slug ou null si non trouvé
    }

}
