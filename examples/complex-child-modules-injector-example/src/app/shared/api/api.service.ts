import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  doRequest(requestUrl: string): Observable<any> {
    return this.httpClient.get(requestUrl);
  }
}
