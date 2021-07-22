import { AnswerService } from './../../_services/answer.service';
import { QuestionService } from '../../_services/question.service';
import { Test, Question } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '@app/_services';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'questions-admin',

  templateUrl: 'questions-edit.component.html',
  styleUrls: ['./../style-admin.scss'],
  providers: [TestsService, QuestionService, AnswerService],
})
export class QuestionsEditComponent implements OnInit {
  displayedColumns: string[] = ['question', 'answers'];
  test: Test;
  question: Question = new Question();
  questions: Question[] = [];
  clickedRows = new Set<Question>();
  newRows = new Set<Question>();
  isEdit = false;
  @Input() id: number;
  @ViewChild(MatTable) table: MatTable<Test>;
  @Output() answer = new EventEmitter<Question>();

  constructor(
    private testService: TestsService,
    private questionService: QuestionService,
    private router: Router,
    activeRoute: ActivatedRoute
  ) {}
  change(e: any) {
    this.answer.emit(e);
  }
  ngOnInit() {
    this.loadTest();
    this.loadQuestion();
  }

  clear() {
    this.clickedRows.clear();
    this.newRows.clear();
    this.isEdit = false;
  }

  loadTest() {
    this.testService
      .getAllTests()
      .subscribe(
        (data: Test[]) => (this.test = data.find((x) => x.id == this.id))
      );
    this.clear();
  }

  loadQuestion() {
    this.questionService
      .getAllQuestions()
      .subscribe(
        (data: Question[]) =>
          (this.questions = data.filter((x) => x.testId == this.test.id))
      );
    this.clear();
  }

  clickAdd() {
    let newItem: Question = {
      id: null,
      testId: this.test.id,
      question: null,
    };
    this.questions.unshift(newItem);
    this.newRows.add(newItem);
    this.table.renderRows();
  }

  onRowSave(id: number) {
    this.newRows.forEach((m) => {
      if (id == m.id) {
        this.question.question = m.question;
        this.question.testId = this.test.id;

        this.questionService
          .createQuestion(this.question)
          .subscribe((data) => this.loadQuestion());
        this.question = new Question();
      }
    });
    this.clear();
  }

  clickDelete(set: Set<Question>) {
    for (let value of set)
      this.questionService
        .deleteQuestion(value.id)
        .subscribe((data) => this.loadQuestion());
    this.clear();
    this.loadQuestion();
  }

  clickSave(set: Set<Question>) {
    for (let value of set)
      this.questionService
        .updateQuestion(value)
        .subscribe((data) => this.loadQuestion());
    this.clear();
    this.loadQuestion();
  }

  clickEdit(set: Set<Question>) {
    let forEdit = new Array<Question>();
    for (let value of set) forEdit.push(value);
    this.questions = forEdit;
    set.clear();
    this.clear();
    this.isEdit = true;
  }

  onButtonAnswer(id: number) {
    if (id) this.router.navigate(['/admin/answers', id]);
  }
}
