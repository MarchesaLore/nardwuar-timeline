import { Component, HostListener } from '@angular/core';
import { InterviewService } from '../interviews/interview.service';
import { IInterview } from '../interviews/interview';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent{
  interviews: IInterview[] = [];
  selectedInterview!: IInterview;
  isDesktop = window.innerWidth > 900;

  onInterviewSelected(interview: IInterview): void {
    this.selectedInterview = interview;
  }
  constructor(private interviewService: InterviewService) {}

 
  ngOnInit() {
    //getting the videos directly from the channel is not working, I think Nardwuar has some privacy setting on the videos or maybe is my country not sure.
    //Will have to go with the json unfortunately 

    //THIS WORKS BUT i REACHED QUOTA :(
    //this.interviewService.getChannelVideos().subscribe(data => {
      //console.log(data);
      //this.interviews = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    //});
    
    this.interviewService.getInterviews().subscribe(interviews => {
      this.interviews = this.sortInterviews(interviews);
    });
    
  }
  private sortInterviews(interviews: IInterview[]): IInterview[] {
    return interviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isDesktop = window.innerWidth > 900;
  }
  //the video is an iframe, so I can't change the widht with css 
  //I need to know the parameter before building the iframe
  getVideoWidth(): number {
    return this.isDesktop ? 600 : 375;
  }
}