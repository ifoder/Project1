import { Answer } from '../_models/answer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnswerService {
  private url = environment.apiUrl + '/api/answer';

  constructor(private http: HttpClient) {}

  getAllAnswers() {
    return this.http.get(this.url);
  }

  getAnswer(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createAnswer(Answer: Answer) {
    return this.http.post(this.url, Answer);
  }

  updateAnswer(Answer: Answer) {
    return this.http.put(this.url, Answer);
  }
  deleteAnswer(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
