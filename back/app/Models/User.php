<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = ['google_id', 'name', 'email', 'profile_picture'];

    // Assure-toi que tu table a bien ces colonnes
}

