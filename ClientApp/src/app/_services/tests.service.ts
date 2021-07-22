import { Test } from '../_models/test';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable()
export class TestsService {
  private url = environment.apiUrl + '/api/tests';
  private categoryUrl = environment.apiUrl + '/api/tests';

  constructor(private http: HttpClient) {}

  getAllTests() {
    return this.http.get(this.url);
  }

  getTest(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  getTestsByCategoryId(id: number) {
    return this.http.get(this.url + '/categories/' + id);
  }

  getCategoryById(id: number) {
    return this.http.get(this.categoryUrl + '/' + id);
  }

  createTest(test: Test) {
    return this.http.post(this.url, test);
  }

  updateTest(test: Test) {
    return this.http.put(this.url, test);
  }
  deleteTest(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
