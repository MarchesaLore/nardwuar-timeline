# NardwuarAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.


This is a personal project, just to practice and show my Angular skills.

On a side note, Nardwuar is a Canadian Jourlanist that is very funny and has interviewed many many musicians, his interviews are not only hilarous but have some incredible deep cuts one of my favorite is the one with Questlove he can't quite believe how deep Nardwuar knowledge in music and history is and he can't keep focus on the conversation! highly suggested!

I have created a new Angular project.
Added routing so that I can have multiple pages, currently having Welcome and Timeline.

Welcome is also the landing page.

<img width="442" alt="image" src="https://github.com/MarchesaLore/nardwuar-timeline/assets/22336407/abbcf6db-f5e0-4284-b33e-afc4834344c9">



the timeline page

<img width="445" alt="image" src="https://github.com/MarchesaLore/nardwuar-timeline/assets/22336407/886653c0-df6a-48df-a826-5f46ac5db7d1">


I have created a timeline, there are a few things happening here:

the interviews are just in a json
I am loading those interviews in the timeline controller and sorting them by date.

the space between one interview and the next one is a day difference with the method calculatePosition I assign to the interview a position from the top.

*youtube video:*
I have a youtubevideo component, needed or the video would not load due to security issues
it is using:

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

so that I can dinamically load the video in SafeResourceUrl, with this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);

when clicking on the interview on the timeline, the video get loaded in the main section of the container, that is to show the communication between two elements
  @Output() interviewSelected = new EventEmitter<any>();
  and the method
  onInterviewSelected
  
