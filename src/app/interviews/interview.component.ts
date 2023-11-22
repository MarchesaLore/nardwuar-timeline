// interview.component.ts

import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {
  @Input() interviews!: any[]; // Array of interview objects with date, artist
  @Output() interviewSelected = new EventEmitter<any>();

  calculatePosition(currentDate: string): number {

    const mostrecentI = this.interviews[0].date;
    if (mostrecentI == currentDate) {
      return 0; 
    }

      const currentDateObj = new Date(currentDate);
      const mostrecentIObj = new Date(mostrecentI);
      console.log(currentDate);
      console.log(mostrecentIObj);
      // Calculate the difference in days
      const timeDifference = mostrecentIObj.getTime() - currentDateObj.getTime() ;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      console.log(daysDifference);

    // Use the difference in days as the pixel distance between dots
    return daysDifference*10;
  }

  selectInterview(interview: any): void {
    this.interviewSelected.emit(interview);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['interviews']) {
      this.calculateTimelineWidth();
    }
  }
  calculateTimelineWidth(): number {
    let diffdate = 1400;
    //console.log(this.interviews.length);
    if (this.interviews && this.interviews.length >= 2) {
      const lastInterview = this.interviews[this.interviews.length - 1];
      diffdate = this.calculatePosition(lastInterview.date);
      //console.log('diffdate '+diffdate);
    }
    return diffdate; 
  }

}
 