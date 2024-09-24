<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Événements OpenDataSoft</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }

        h1 {
            text-align: center;
            margin-top: 20px;
        }

        .event-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 30px;
        }

        .event-card {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 300px;
            margin: 15px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .event-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .event-details {
            font-size: 14px;
            color: #666;
        }
        img{
            width: 120px;
        }
    </style>
</head>

<body>

    <div class="event-container">
        @if (!empty($events) && count($events) > 0)
        @foreach ($events as $event)
        <div class="event-card">
            <div class="event-title">{{ $event['title_fr'] ?? 'Titre non disponible' }}</div>
            <div class="event-details">
                <img src={{ $event['image'] ?? 'image non disponible' }} alt="">
                <p>Date de début: {{ $event['firstdate_begin'] ?? 'Date de départ non disponible' }}</p>
                <p>Région: {{ $event['location_region'] ?? 'Région non disponible' }}</p>
                <p>Département: {{ $event['location_department'] ?? 'Département non disponible' }}</p>
            </div>
        </div>
        @endforeach
        @else
        <p>Aucun événement disponible.</p>
        @endif
    </div>
</body>

</html>