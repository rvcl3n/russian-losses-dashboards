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
        map(val => {
          if (!val['body'].hasOwnProperty('length')){
          throw new Error("Wrong response(Lambda is starting...)");
          }
          return val;
        }),
        retry({ count: 3, delay: this.shouldRetry }),
        tap(_ => this.log('fetched total losses')),
        catchError(this.handleError<any>('getHeroes', '')),
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

    console.log("Wrong response(Lambda is starting...)");

    console.log("Error text: " + res);

    if (!res.hasOwnProperty('body')) {

      console.log('If statement 1');

      return timer(5000); // Adding a timer from RxJS to return observable to delay param.
    }

    // Example for catching specific error code as well
    if (!res['body'].hasOwnProperty('length')) {

      console.log('If statement 2');

      return timer(5000); // Adding a timer from RxJS to return observable to delay param.
    }

    return timer(5000);
  }
  
}
