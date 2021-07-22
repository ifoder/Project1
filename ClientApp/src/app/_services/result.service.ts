import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Test, Question, UserScore } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ResultService {
  private url = environment.apiUrl + '/api/score';

  constructor(private http: HttpClient) {}

  getAllScores() {
    return this.http.get(this.url);
  }

  getScore(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createScore(score: UserScore) {
    return this.http.post(this.url, score);
  }

  updateScore(score: UserScore) {
    return this.http.put(this.url, score);
  }
  deleteScore(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
