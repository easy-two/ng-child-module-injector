import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eager',
  templateUrl: './eager.component.html',
  styleUrls: ['./eager.component.css']
})
export class EagerComponent implements OnInit {

  constructor(apiService: ApiService, httpClient: HttpClient) {
    apiService.doRequest('/eager/request-wiht-api-http-client').subscribe(() => {}, () => {});
    httpClient.get('/eager/request-with-http').subscribe(() => {}, () => {});
  }

  ngOnInit() {
  }

}
