import { Router } from '@angular/router';
import { element } from 'protractor';
import { CategoriesService } from './../../_services/categories.service';
import { Categories } from './../../_models/categories';
import { TestsService } from './../../_services/tests.service';
import { Test } from '../../_models/test';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'tests-admin',

  templateUrl: 'test-edit.component.html',
  styleUrls: ['./../style-admin.scss'],
  providers: [TestsService, CategoriesService],
})
export class TestEditComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'category',
    'title',
    'description',
    'questions',
  ];
  test: Test = new Test();
  tests: Test[] = [];
  categories: Categories[];
  clickedRows = new Set<Test>();
  newRows = new Set<Test>();
  isEdit = false;
  @ViewChild(MatTable) table: MatTable<Test>;
  @Output() question = new EventEmitter<Test>();

  constructor(
    private testService: TestsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}
  change(e: any) {
    this.question.emit(e);
  }
  ngOnInit() {
    this.loadTest();
  }

  clear() {
    this.clickedRows.clear();
    this.newRows.clear();
    this.isEdit = false;
  }

  loadCategories() {
    this.categoriesService
      .getAllCategories()
      .subscribe((data: Categories[]) => (this.categories = data));
  }

  loadTest() {
    this.testService
      .getAllTests()
      .subscribe((data: Test[]) => (this.tests = data));
    this.clear();
  }

  clickAdd() {
    let newItem: Test = {
      id: null,
      title: null,
      description: null,
      categoryId: 0,
    };
    this.loadCategories();
    this.tests.unshift(newItem);
    this.newRows.add(newItem);
    this.table.renderRows();
  }

  clickDelete(set: Set<Test>) {
    for (let value of set)
      this.testService
        .deleteTest(value.id)
        .subscribe((data) => this.loadTest());
    this.clear();
    this.loadTest();
  }

  clickSave(set: Set<Test>) {
    for (let value of set)
      this.testService.updateTest(value).subscribe((data) => this.loadTest());
    this.clear();
    this.loadTest();
  }

  onRowSave(id: number) {
    this.newRows.forEach((m) => {
      if (id == m.id) {
        this.test.title = m.title;
        this.test.description = m.description;
        this.test.categoryId = m.categoryId;

        this.testService
          .createTest(this.test)
          .subscribe((data) => this.loadTest());
        this.test = new Test();
      }
    });
    this.clear();
  }

  clickEdit(set: Set<Test>) {
    let forEdit = new Array<Test>();
    for (let value of set) forEdit.push(value);
    this.tests = forEdit;
    this.loadCategories();
    set.clear();
    this.clear();
    this.isEdit = true;
  }

  onButtonQuestion(id: number) {
    // if (id) this.router.navigate(['/admin/questions', id]);
    // this.onChange.emit(id);
  }
}
