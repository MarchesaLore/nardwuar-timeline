import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { InterviewService } from '../interviews/interview.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent{
  interviews: any[] = [];
  selectedInterview: any;
  isMobile = false;

  onInterviewSelected(interview: any): void {
    this.selectedInterview = interview;
  }
  constructor(private interviewService: InterviewService, private breakpointObserver: BreakpointObserver) {}

 
  ngOnInit() {
    this.interviewService.getInterviews().subscribe(data => {
      this.interviews = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      //console.log(data);
    });
    this.breakpointObserver.observe([
      Breakpoints.Handset, // Media query for mobile
      Breakpoints.Tablet, // Add more breakpoints if needed
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }
  
}