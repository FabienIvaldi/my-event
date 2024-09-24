import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '@pages/profile/profile.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LoginService } from '@app/services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { GetInfoService } from '@app/services/get-info.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileComponent, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  pageTitle!: string;
  event: any;

  constructor(
    private authService: LoginService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private eventPageService: GetInfoService
  ) { }

  ngOnInit() {
    // Récupère le code d'autorisation si présent dans l'URL
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.getAccessToken(code);
      }
    });

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.getUserInfo(accessToken);
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });

    this.updatePageTitle();

    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.eventPageService.getEventBySlug(slug).subscribe(
        (event) => {
          this.event = event;
          this.pageTitle = this.event.title_fr;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // Redirige l'utilisateur vers l'authentification Google
  loginWithGoogle() {
    this.authService.getGoogleAuthUrl().subscribe((authUrl) => {
      window.location.href = authUrl;
    });
  }

  // Échange le code d'autorisation contre un token d'accès
  getAccessToken(code: string) {
    this.authService.getAccessToken(code).subscribe((response) => {
      const accessToken = response.access_token;
      localStorage.setItem('access_token', accessToken);
      this.getUserInfo(accessToken);
    });
  }

  // Récupère les informations de l'utilisateur
  getUserInfo(accessToken: string) {
    this.authService.getUserInfo(accessToken).subscribe((userInfo) => {
      this.userInfo = userInfo;
      console.log(userInfo);

      // Enregistre les informations de l'utilisateur dans la DB
      this.authService.saveUserInfo(userInfo).subscribe((response) => {
        console.log('Utilisateur enregistré dans la base de données :', response);
      });
    });
  }

  updatePageTitle(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      const currentRoute = this.router.url;

      if (slug) {
        if (this.event) {
          this.pageTitle = this.event.title_fr;
        } else {
          this.pageTitle = "Информация о событии";
        }
      } else if (currentRoute.includes('/home')) {
        this.pageTitle = "Liste d'événements";
      } else if (currentRoute.includes('/profile')) {
        this.pageTitle = 'Profile';
      } else if (currentRoute.includes('/about')) {
        this.pageTitle = 'About Us';
      } else {
        this.pageTitle = 'My events';
      }
    });
  }
}
