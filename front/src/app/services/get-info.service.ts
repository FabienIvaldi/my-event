import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  private apiUrl = 'http://localhost:8000/api/show-info';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      tap(response => console.log('Response from API:', JSON.stringify(response, null, 2))),
      map(response => response),
      catchError(this.handleError)
    );
  }

  getEventBySlug(slug: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${slug}`).pipe(
      tap(response => console.log('Response from API:', JSON.stringify(response, null, 2))),
      map(response => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
