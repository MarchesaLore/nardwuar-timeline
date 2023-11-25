// interview.component.ts

import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {
  @Input() interviews!: any[]; 
  @Output() interviewSelected = new EventEmitter<any>();

  //method returns the number of days between most recent interview and current date
  //this number will be the number of pixels from the top 
  //goal is to have the interivews separated between each other as the days difference 
  calculatePosition(currentDate: string): number {
    const mostrecentI = this.interviews[0].date;
    if (mostrecentI == currentDate) {
      return 0; 
    }

      const currentDateObj = new Date(currentDate);
      const mostrecentIObj = new Date(mostrecentI);
      //console.log(currentDate);
      //console.log(mostrecentIObj);
      // Calculate the difference in days
      const timeDifference = mostrecentIObj.getTime() - currentDateObj.getTime() ;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      //console.log(daysDifference);

    // Use the difference in days as the pixel distance between dots
    return daysDifference*10; // 10px x giorno
   }

   //method communicate with parent componenet timeline 
   //when click on the description the parent component timeline shows loads the video
  selectInterview(interview: any): void {
    this.interviewSelected.emit(interview);
  }

  //on changes cause when I first load the array interview is empty
  //once it loads async I also can calculate the lenght of the timeline
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['interviews']) {
      this.calculateTimelineWidth();
    }
  }


  calculateTimelineWidth(): number {
    let diffdate = 500; //height of the container (if it is empty at least it'll be 500px)
    //console.log(this.interviews.length);
    if (this.interviews && this.interviews.length >= 2) {
      const lastInterview = this.interviews[this.interviews.length - 1];
      //get the days between first and last interview
      diffdate = this.calculatePosition(lastInterview.date);
      //console.log('diffdate '+diffdate);
    }
    return diffdate; 
  }

}
 