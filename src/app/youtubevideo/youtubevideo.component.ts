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

  // Sanitize to prevent security issues
  getVideoUrl(): SafeResourceUrl {
    if (!this.isValidYoutubeVideoId(this.youtubeVideoId)) {
      throw new Error('Invalid YouTube Video ID');
    }

    const youtubeUrl = `https://www.youtube.com/embed/${this.youtubeVideoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }

  // Validate YouTube Video ID format
  private isValidYoutubeVideoId(videoId: string): boolean {
    const youtubeVideoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    return youtubeVideoIdRegex.test(videoId);
  }
}
