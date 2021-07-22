import { AuthenticationService } from './../_services/authentication.service';
import { UserScore } from './../_models/user-score';
import { TestsService } from './../_services/tests.service';
import { AnswerService } from './../_services/answer.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from './../_services/question.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Answer } from './../_models/answer';
import { Question, User } from '@app/_models';
import { Test } from '../_models/test';
import { Component, OnInit } from '@angular/core';
import { takeWhile, tap, timeInterval } from 'rxjs/operators';
import { interval, observable, timer, Observable } from 'rxjs';
observable;

@Component({
  templateUrl: './play-test.component.html',
  styleUrls: ['./play-test.component.scss'],
  providers: [QuestionService, AnswerService, TestsService],
})
export class PlayTestComponent implements OnInit {
  test: Test;
  question: Question = new Question();
  questions: Question[];
  questionAnswers: Answer[] = [];
  subscribeTimer = 0;
  afterAnswerTimeout = 1500;
  disabled = false;
  count: number = 1;
  questionsLength: number;
  id: number;
  timeDisplay: string;
  time: number = 0;
  resultPage = false;
  userScore: UserScore = new UserScore();
  user: User;
  progress: string[] = [];

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private testService: TestsService,
    private authenticationService: AuthenticationService,
    activeRoute: ActivatedRoute
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
    this.id = Number.parseInt(activeRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.getTest();
    this.getQuestions();
    this.setTimer();
    this.userScore.wrong = 0;
    this.userScore.correct = 0;
  }

  getNextQuestion() {
    if (this.count == this.questionsLength) {
      this.userScore.time = this.time;
      this.userScore.userId = this.user.id;
      this.userScore.testId = this.test.id;
      console.log(this.userScore);

      this.resultPage = true;
    } else {
      this.question = this.questions.shift();
      this.getAnswers(this.question);
      this.disabled = false;
      this.count++;
    }
  }

  getQuestions() {
    this.questionService.getAllQuestions().subscribe((data: Question[]) => {
      this.questions = data.filter((x) => x.testId == this.id);
      this.questionsLength = this.questions.length;
      this.setProgress();

      this.question = this.questions.shift();
      this.getAnswers(this.question);
      console.log(this.progress);
    });
  }

  setProgress() {
    for (let index = 0; index <= this.questionsLength; index++) {
      this.progress[index] = 'default';
    }
  }

  getTest() {
    this.testService
      .getTest(this.id)
      .subscribe((data: Test) => (this.test = data));
  }

  getAnswers(question: Question) {
    this.answerService
      .getAllAnswers()
      .subscribe(
        (data: Answer[]) =>
          (this.questionAnswers = data.filter(
            (x) => x.questionId == this.question.id
          ))
      );
  }

  onClick(answer: Answer) {
    if (!this.disabled) {
      this.disabled = true;
      if (answer.correct) {
        this.userScore.correct++;
        this.progress[this.count - 1] = 'correct';
      } else {
        this.userScore.wrong++;
        this.progress[this.count - 1] = 'wrong';
      }
      let okJob = setTimeout(
        () => this.getNextQuestion(),
        this.afterAnswerTimeout
      );
    }
  }

  setTimer() {
    let m = 0;
    timer(0, 1000).subscribe((s) => {
      this.time++;
      m = Math.trunc(s / 60);
      if (m > 0) {
        s = s % 60;
      }
      this.timeDisplay = `${m > 9 ? '' : '0'}${m}:${s > 9 ? '' : '0'}${s}`;
    });
  }

  getClass(answer: Answer) {
    if (answer.correct) {
      return 'correct';
    } else if (this.disabled) {
      return 'incorrect';
    }
    return 'default';
  }
}
