import { Question } from '../_models/question';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuestionService {
  private url = environment.apiUrl + '/api/question';

  constructor(private http: HttpClient) {}

  getAllQuestions() {
    return this.http.get(this.url);
  }

  getQuestion(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createQuestion(question: Question) {
    return this.http.post(this.url, question);
  }

  updateQuestion(question: Question) {
    return this.http.put(this.url, question);
  }
  deleteQuestion(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
