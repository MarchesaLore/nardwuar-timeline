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
  //issue with the channel, here is a test channel to see that method works UC_x5XG1OV2P6uZZ5FSM9Ttw

  constructor(private http: HttpClient) { }

  //method to get all the interviews from the json
  getInterviews(): Observable<IInterview[]> {
    return this.http.get<IInterview[]>(this.interviewUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  //method to get the interview by id
  getInterview(id: number): Observable<IInterview | undefined> {
    return this.getInterviews()
      .pipe(
        map((interviews: IInterview[]) => interviews.find(p => p.interviewId === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
  
  getChannelVideos(): Observable<IInterview[]> {
    //Call is returning an empty array, I think I need permission 
    //it is working with a different channel, so I am just going to use the json
     //const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.channelId}&key=${this.apiKey}&type=video`;
   
     //changed to search results filtered by channel (nardwuar channel) I have a limit of 50 here...
     const urlNew = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMjKUfZk_rYtoRtVCcQYLdQnMVjB9qVB8&q=nardwuar vs.&type=video&part=snippet&channelId=UC8h8NJG9gacZ5lAJJvhD0fQ&maxResults=50`
    
    return this.http.get<any>(urlNew).pipe(
      map(response => {
        return response.items.map((item: any, index: number) => {
          //getting the artist name by the title, they have the same format
          const artiststr = this.cleanTitle(item.snippet.title);
          return {
            interviewId: index + 1,
            artist: artiststr,
            date: this.formatDate(item.snippet.publishedAt),
            videoUrl: item.id.videoId
          };
        });
      })
    );
  }
  private cleanTitle(title: string): string {
    //removing the repeating part
    let cleanedTitle = title.replace('Nardwuar vs. ', '');
    //removing any parentesis stuff
    cleanedTitle = cleanedTitle.replace(/\([^)]+\)/g, '');
    cleanedTitle = cleanedTitle.trim();
    return cleanedTitle;
  }
  private formatDate(publishTime: string): string {
    //formatting the data in a way that works with my sorting and calculation for position
    const date = new Date(publishTime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
