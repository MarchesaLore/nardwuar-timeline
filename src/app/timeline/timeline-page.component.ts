import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { InterviewService } from '../interviews/interview.service';
import { IInterview } from '../interviews/interview';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent{
  interviews: any[] = [];
  selectedInterview: any;
  isSticky = false;

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
  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    // Set the sticky condition based on the scroll position
    this.isSticky = window.scrollY > 500; // Adjust the value based on when you want it to become sticky
  }
}