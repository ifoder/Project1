import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { Question, User } from 'src/app/_models';
import { Test } from 'src/app/_models/test';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: ['./style-admin.scss'],
})
export class AdminComponent {
  tabs = [];
  type = [];
  ids = [];
  user: User;
  selected = new FormControl(0);
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.user.subscribe((x) => {
      this.user = x;
      if (!this.user.admin) this.router.navigate(['/categories']);
    });
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  fromT(test: Test) {
    this.tabs.push('Question ID: ' + test.id);
    this.type.push('Questions');
    this.ids.push(test.id);
    this.selected.setValue(this.tabs.length + 1);
  }

  fromQ(question: Question) {
    console.log(question);

    this.tabs.push('Answer ID: ' + question.id);
    this.type.push('Answers');
    this.ids.push(question.id);
    this.selected.setValue(this.tabs.length + 1);
  }
}
