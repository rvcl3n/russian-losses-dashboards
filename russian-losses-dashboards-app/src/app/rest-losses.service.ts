import { Injectable } from '@angular/core';

import { Observable, of, timer } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestLossesService {

  private heroesUrl = 'https://lossesapi.warcharts.com/dynamodbmanager';  // URL to web api

  constructor(private http: HttpClient) { }

  getTotalLosses(): Observable<any> {
    return this.http.get<any>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched total losses')),
        catchError(this.handleError<any>('getHeroes', '')),
        retry({ count: 3, delay: this.shouldRetry })
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

  shouldRetry(res: HttpResponse<any>) {
    // Example for catching specific error code as well
    if (!res.hasOwnProperty('length')) {
      return timer(1000); // Adding a timer from RxJS to return observable to delay param.
    }

    throw res;
  }
  
}
