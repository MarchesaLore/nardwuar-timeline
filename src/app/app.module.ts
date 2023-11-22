import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { TimelinePageComponent } from './timeline/timeline-page.component';
import { InterviewComponent } from './interviews/interview.component';
import { YoutubeEmbedComponent } from './youtubevideo/youtubevideo.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutComponent,
    TimelinePageComponent,
    InterviewComponent,
    YoutubeEmbedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [    
    YoutubeEmbedComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }