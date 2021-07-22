import { ResultService } from './../_services/result.service';
import { Router } from '@angular/router';
import { Test } from './../_models/test';
import { TestsService } from './../_services/tests.service';
import { UserScore } from './../_models/user-score';
import { Component, Input } from '@angular/core';
import { User } from '@app/_models';

@Component({
  selector: 'result-page',
  templateUrl: 'result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() score: UserScore;
  @Input() progress: string[];
  users: User[];
  test: Test;
  timeDisplay: string;
  percentage: number;
  displayTitle: string;

  constructor(
    private testService: TestsService,
    private resultService: ResultService
  ) {}

  ngOnInit() {
    this.getTest();
    this.setTime();
    this.calculatePercentage();
    this.saveResult();
  }

  getTest() {
    this.testService
      .getTest(this.score.testId)
      .subscribe((data: Test) => (this.test = data));
  }

  setTime() {
    let s = this.score.time;
    let m = 0;
    m = Math.trunc(s / 60);
    if (m > 0) {
      s = s % 60;
    }
    this.timeDisplay = `You completed the test in ${m} minutes and ${s} seconds`;
  }

  calculatePercentage() {
    this.percentage = Math.ceil(
      (100 * this.score.correct) / (this.score.correct + this.score.wrong)
    );
    if (this.percentage >= 80) {
      this.displayTitle = 'Great job!';
    } else if (this.percentage >= 60) {
      this.displayTitle = 'Not Bad!';
    } else {
      this.displayTitle = 'Try again!';
    }
  }

  saveResult() {
    this.resultService.createScore(this.score).subscribe((data) => data);
  }
}
