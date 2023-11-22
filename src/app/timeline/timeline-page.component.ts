import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { InterviewService } from '../interviews/interview.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent{
  interviews: any[] = [];
  selectedInterview: any;

  onInterviewSelected(interview: any): void {
    this.selectedInterview = interview;
  }
  constructor(private interviewService: InterviewService) {}

 
  ngOnInit() {
    this.interviewService.getInterviews().subscribe(data => {
      this.interviews = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      //console.log(data);
    });
    
  }
  
}