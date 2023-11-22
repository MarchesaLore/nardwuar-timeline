import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IInterview } from "./interview";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private interviewUrl = '/assets/interviews.json';

  constructor(private http: HttpClient) { }

  getInterviews(): Observable<IInterview[]> {
    return this.http.get<IInterview[]>(this.interviewUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get one interview
  // Since we are working with a json file, we can only retrieve all interviews
  // So retrieve all interviews and then find the one we want using 'map'
  getInterview(id: number): Observable<IInterview | undefined> {
    return this.getInterviews()
      .pipe(
        map((interviews: IInterview[]) => interviews.find(p => p.interviewId === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}