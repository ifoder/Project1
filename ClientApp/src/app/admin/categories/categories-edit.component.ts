import { AuthenticationService } from './../../_services/authentication.service';
import { User } from './../../_models/user';
import { Categories } from './../../_models/categories';
import { CategoriesService } from './../../_services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'categories-admin',

  templateUrl: 'categories-edit.component.html',
  styleUrls: ['./../style-admin.scss'],
  providers: [CategoriesService],
})
export class CategoriesEditComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name'];
  category: Categories = new Categories();
  categories: Categories[];
  user: User;
  clickedRows = new Set<Categories>();
  newRows = new Set<Categories>();
  isEdit = false;
  @ViewChild(MatTable) table: MatTable<Categories>;

  constructor(
    private authenticationService: AuthenticationService,
    private categoriesService: CategoriesService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.loadCategories();
    console.log(this.user);
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
    this.clear();
  }

  clickAdd() {
    let newItem: Categories = { id: null, name: null };
    this.categories.unshift(newItem);
    this.newRows.add(newItem);
    this.table.renderRows();
  }

  clickDelete(set: Set<Categories>) {
    for (let value of set)
      this.categoriesService
        .deleteCategories(value.id)
        .subscribe((data) => this.loadCategories());
    this.clear();
    this.loadCategories();
  }

  clickSave(set: Set<Categories>) {
    for (let value of set)
      this.categoriesService
        .updateCategories(value)
        .subscribe((data) => this.loadCategories());
    this.clear();
    this.loadCategories();
  }

  onRowSave(id: number) {
    let newItem: Categories;
    this.newRows.forEach((m) => {
      if (id == m.id) {
        this.category.name = m.name;
        this.categoriesService
          .createCategories(this.category)
          .subscribe((data) => this.loadCategories());
        this.category = new Categories();
      }
    });
    this.clear();
  }

  clickEdit(set: Set<Categories>) {
    let forEdit = new Array<Categories>();
    for (let value of set) forEdit.push(value);
    this.categories = forEdit;
    set.clear();
    this.clear();
    this.isEdit = true;
  }
}
