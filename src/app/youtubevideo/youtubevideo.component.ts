import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embed',
  templateUrl: './youtubevideo.component.html',
})
export class YoutubeEmbedComponent {
  @Input() youtubeVideoId!: string; 
  @Input() videowidth: number = 560;

  constructor(private sanitizer: DomSanitizer) {}

  //sanatize to prevent security issues
  getVideoUrl(): SafeResourceUrl {
    const youtubeUrl = `https://www.youtube.com/embed/${this.youtubeVideoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}