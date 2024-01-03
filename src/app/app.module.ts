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
import { RandomFactsComponent } from './random-facts/random-facts.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutComponent,
    TimelinePageComponent,
    InterviewComponent,
    YoutubeEmbedComponent,
    RandomFactsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [    
    YoutubeEmbedComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }