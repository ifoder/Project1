import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../_services/authentication.service';
import { UserScore } from './../_models/user-score';
import { ResultService } from './../_services/result.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Test } from '@app/_models';
import { UserService, TestsService } from '@app/_services';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['test', 'user', 'correct', 'wrong', 'time'];
  users: User[];
  userScores: UserScore[];
  user: User;
  tests: Test[];

  sortedData: UserScore[];
  @ViewChild(MatSort) sort: MatSort;

  public dataSource = new MatTableDataSource<UserScore>();

  constructor(
    private userService: UserService,
    private resultService: ResultService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.users = users;
      });
    this.getScore();
  }

  getScore() {
    this.resultService.getAllScores().subscribe((data: UserScore[]) => {
      this.dataSource.data = data as UserScore[];
      this.userScores = data.filter((m) => m.userId == this.user.id);
      console.log(this.userScores);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getUserName(id: number) {
    let u = this.users.find((m) => m.id == id);
    return u.username;
  }

  getTime(t: number) {
    let s = t;
    let m = 0;
    m = Math.trunc(s / 60);
    if (m > 0) {
      s = s % 60;
    }
    return `${m > 9 ? '' : '0'}${m}:${s > 9 ? '' : '0'}${s}`;
  }
}
