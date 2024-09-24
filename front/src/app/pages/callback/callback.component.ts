import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@app/services/login.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: LoginService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.getAccessToken(code).subscribe(tokenResponse => {
          localStorage.setItem('access_token', tokenResponse.access_token);
          this.router.navigate(['/profile']);
        });
      }
    });
  }
}
