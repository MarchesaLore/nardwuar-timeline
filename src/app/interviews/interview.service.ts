import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IInterview } from "./interview";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private interviewUrl = '/assets/interviews.json';

  //I created a key on google cloud platform under API 
  private apiKey = 'AIzaSyAIVn4zEKmCEHTQee3dWPJe384HS3_fxlw';
  private channelId = 'UCeAsPJxI6K3Ii4TGTcL7q3g';

  constructor(private http: HttpClient) { }

  getInterviews(): Observable<IInterview[]> {
    return this.http.get<IInterview[]>(this.interviewUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getChannelVideos(): Observable<any> {
    //Call is returning an empty array, I think I need permission it is working with a different channel, so I am just going to use the json
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.channelId}&key=${this.apiKey}&type=video`;
    return this.http.get(url);
  }

  
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
