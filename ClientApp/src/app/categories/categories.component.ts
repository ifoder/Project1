import { AuthenticationService } from './../_services/authentication.service';
import { User } from './../_models/user';
import { CategoriesService } from './../_services/categories.service';
import { Categories } from './../_models/categories';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  providers: [CategoriesService],
})
export class CategoriesComponent implements OnInit {
  categories: Categories[];
  tableMode: boolean;
  user: User;
  admin: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private categoriesService: CategoriesService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService
      .getAllCategories()
      .subscribe((data: Categories[]) => (this.categories = data));
  }
}
