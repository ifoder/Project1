import { Router, ActivatedRoute } from '@angular/router';
import { TestsService } from './../_services/tests.service';
import { TestAcceptDialog } from '../test-list/test-accept-dialog/test-accept-dialog';
import { Test } from '../_models/test';
import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tests-list',
  templateUrl: './test-list.component.html',
  providers: [TestsService],
})
export class TestListComponent {
  id: number;
  loading = false;
  testList = 'test-list';
  tests: Test[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private testService: TestsService,
    activeRoute: ActivatedRoute
  ) {
    this.id = Number.parseInt(activeRoute.snapshot.params['id']);
  }

  openDialog(test: Test) {
    const dialogRef = this.dialog.open(TestAcceptDialog, {
      maxWidth: '500px',
      data: test,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed ', result);
      if (result == true) {
        this.router.navigate(['/play', test.id]);
      }
    });
  }

  ngOnInit() {
    this.getTestsByCategoryId();
    console.log(this.tests);
  }

  getTestsByCategoryId() {
    this.testService
      .getAllTests()
      .subscribe(
        (data: Test[]) =>
          (this.tests = data.filter((x) => x.categoryId == this.id))
      );
  }
}
