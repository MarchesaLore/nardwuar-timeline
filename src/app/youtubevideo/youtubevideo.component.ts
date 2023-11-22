import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embed',
  template: `
    <iframe [src]="getVideoUrl()" [width]="videowidth" height="315" frameborder="0" allowfullscreen></iframe>
  `,
})
export class YoutubeEmbedComponent {
  @Input() youtubeVideoId!: string; // Accept youtubeVideoId as an input parameter
  @Input() videowidth: number = 560;

  constructor(private sanitizer: DomSanitizer) {}

  getVideoUrl(): SafeResourceUrl {
    const youtubeUrl = `https://www.youtube.com/embed/${this.youtubeVideoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}