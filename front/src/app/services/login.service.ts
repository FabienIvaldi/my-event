import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private googleAuthUrl = 'https://accounts.google.com/o/oauth2/auth';
  private clientId = '582633277622-bsl72jbdt70hmjga4n803r7h8rge5bkn.apps.googleusercontent.com';
  private redirectUri = 'http://localhost:4200/callback'; // adjust this to your app's redirect URI
  private scope = 'email profile';

  constructor(private http: HttpClient) { }

  getGoogleAuthUrl(): Observable<string> {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('redirect_uri', this.redirectUri)
      .set('scope', this.scope)
      .set('response_type', 'code')
      .set('access_type', 'offline');

    return of(`${this.googleAuthUrl}?${params.toString()}`);
  }
  getAccessToken(code: string): Observable<any> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', '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') // Remplacez par votre secret client
      .set('redirect_uri', this.redirectUri)
      .set('grant_type', 'authorization_code')
      .set('code', code);

    return this.http.post(tokenUrl, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getUserInfo(accessToken: string): Observable<any> {
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

    return this.http.get(userInfoUrl, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    });
  }

  // Envoie les informations de l'utilisateur à ton backend Laravel
  saveUserInfo(userInfo: any): Observable<any> {
    const apiUrl = 'http://localhost:8000/api/save-user'; // Assure-toi que cette URL correspond à ton endpoint Laravel

    return this.http.post(apiUrl, userInfo);
  }
}