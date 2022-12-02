import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestLossesService {

  private heroesUrl = 'https://lossesapi.warcharts.com/dynamodbmanager';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'access-control-allow-origin' : '*'})
  };

  constructor(private http: HttpClient) { }

  getTotalLosses(): Observable<any> {
    return this.http.get<any>(this.heroesUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched total losses')),
        catchError(this.handleError<any>('getHeroes', ''))
      );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
