import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],  // Исправлено на styleUrls
  imports: [CommonModule, FormsModule, RouterLink]
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  bio: string = ''; // Описание пользователя
  selectedFile: File | null = null;

  organizedEvents: any[] = [];

  constructor(
    private profileService: ProfileService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.http.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken)
        .subscribe(userInfo => {
          this.userInfo = userInfo;
          console.log(userInfo);
          console.log(localStorage.getItem('authToken'))
        });
    }

    // Загрузка организованных событий
    const events = localStorage.getItem('organizedEvents');
    if (events) {
      this.organizedEvents = JSON.parse(events);
    }

    // Загрузка bio из локального хранилища
    const savedBio = localStorage.getItem('bio');
    if (savedBio) {
      this.bio = savedBio;
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const token = localStorage.getItem('access_token');
      this.http.post('http://localhost:8000/api/upload-profile-picture', formData, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }).subscribe(
        response => {
          console.log('Image uploadée avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'upload', error);
        }
      );
    } else {
      console.error('Aucun fichier sélectionné');
    }
  }


  saveBio() {
    localStorage.setItem('bio', this.bio);
    console.log('Bio saved to localStorage');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
  }
}