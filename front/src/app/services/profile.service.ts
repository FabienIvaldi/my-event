import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/api';
  private uploadUrl = 'http://localhost:8000/api/upload-profile-picture';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { headers: this.getHeaders() });
  }

  updateBio(bio: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/bio`, { bio }, { headers: this.getHeaders() });
  }
  uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}
