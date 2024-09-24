<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api'); // Assure que l'utilisateur est authentifié via API
    }
    public function saveUser(Request $request)
    {
        $data = $request->all();

        // Vérifie si l'utilisateur existe déjà
        $user = User::firstOrCreate(
            ['google_id' => $data['id']], // ou un autre identifiant unique
            [
                'name' => $data['name'],
                'email' => $data['email'],
                'profile_picture' => $data['picture']
            ]
        );

        return response()->json($user);
    }
    public function uploadProfilePicture(Request $request)
    {
        // Assurez-vous que l'utilisateur est authentifié
        if (!$request->user()) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }

        $user = User::where('google_id', $request->user()->id)->first();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        // Validation de l'image
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Sauvegarder l'image
        $image = $request->file('file');
        $imageName = time() . '.' . $image->extension();

        // Déplacer l'image vers le dossier 'profile_pictures'
        if ($image->move(public_path('profile_pictures'), $imageName)) {
            // Mettre à jour l'image de profil de l'utilisateur
            $user->profile_picture = $imageName;
            $user->save();

            return response()->json(['message' => 'Image de profil mise à jour avec succès']);
        }

        return response()->json(['message' => 'Erreur lors du téléchargement de l\'image'], 500);
    }




}
