import { AnswerService } from '../../_services/answer.service';
import { QuestionService } from '../../_services/question.service';
import { Test, Answer, Question } from 'src/app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'answers-admin',

  templateUrl: 'answers-edit.component.html',
  styleUrls: ['./../style-admin.scss'],
  providers: [QuestionService, AnswerService],
})
export class AnswersEditComponent implements OnInit {
  displayedColumns: string[] = ['answer', 'correct'];
  question: Question;
  answer: Answer = new Answer();
  answers: Answer[];
  clickedRows = new Set<Answer>();
  newRows = new Set<Answer>();
  isEdit = false;
  @Input() id: number;
  @ViewChild(MatTable) table: MatTable<Test>;

  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService,
    activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadQuestion();
    this.loadAnswer();
  }

  clear() {
    this.clickedRows.clear();
    this.newRows.clear();
    this.isEdit = false;
  }

  loadAnswer() {
    this.answerService
      .getAllAnswers()
      .subscribe(
        (data: Answer[]) =>
          (this.answers = data.filter((x) => x.questionId == this.id))
      );
    this.clear();
  }

  loadQuestion() {
    this.questionService
      .getAllQuestions()
      .subscribe(
        (data: Question[]) =>
          (this.question = data.find((x) => x.id == this.id))
      );
    this.clear();
  }

  clickAdd() {
    let newItem: Answer = {
      id: null,
      questionId: this.id,
      answer: null,
      correct: false,
    };
    this.answers.unshift(newItem);
    this.newRows.add(newItem);
    this.table.renderRows();
  }

  onRowSave(id: number) {
    this.newRows.forEach((m) => {
      if (id == m.id) {
        this.answer.answer = m.answer;
        this.answer.correct = m.correct;
        this.answer.questionId = this.id;
        console.log(this.answer);

        this.answerService
          .createAnswer(this.answer)
          .subscribe((data) => this.loadAnswer());
        this.answer = new Answer();
      }
    });
    this.clear();
  }

  clickDelete(set: Set<Answer>) {
    for (let value of set)
      this.answerService
        .deleteAnswer(value.id)
        .subscribe((data) => this.loadAnswer());
    this.clear();
    this.loadAnswer();
  }

  clickSave(set: Set<Answer>) {
    for (let value of set)
      this.answerService
        .updateAnswer(value)
        .subscribe((data) => this.loadAnswer());
    this.clear();
    this.loadAnswer();
  }

  clickEdit(set: Set<Answer>) {
    let forEdit = new Array<Answer>();
    for (let value of set) forEdit.push(value);
    this.answers = forEdit;
    set.clear();
    this.clear();
    this.isEdit = true;
  }
}
