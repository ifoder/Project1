import { User } from './../_models/user';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'reg.component.html' })
export class RegComponent implements OnInit {
  regForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.regForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.regForm.invalid) {
      return;
    }
    if (this.f.password.value !== this.f.password2.value) {
      this.error = 'Password mismatch!';
      return;
    }
    this.loading = true;
    let user: User = new User();

    user.username = this.f.username.value;
    user.password = this.f.password.value;

    this.authenticationService
      .reg(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
