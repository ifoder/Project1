import { Categories } from './../_models/categories';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable()
export class CategoriesService {
  private url = environment.apiUrl + '/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(this.url);
  }

  getCategories(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createCategories(categories: Categories) {
    return this.http.post(this.url, categories);
  }
  updateCategories(categories: Categories) {
    return this.http.put(this.url, categories);
  }
  deleteCategories(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
