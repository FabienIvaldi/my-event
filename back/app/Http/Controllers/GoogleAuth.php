<?php

// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Auth;


class GoogleAuth extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->user();

        // Trouver ou créer un utilisateur
        $existingUser = User::where('google_id', $user->id)->first();

        if ($existingUser) {
            // Connecter l'utilisateur existant
            Auth::login($existingUser);
        } else {
            // Créer un nouvel utilisateur
            $newUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'google_id' => $user->id,
                'password' => bcrypt('random_password'), // Vous pouvez définir un mot de passe aléatoire
            ]);

            Auth::login($newUser);
        }

        return redirect()->route('home'); // Modifier en fonction de votre logique
    }
}
