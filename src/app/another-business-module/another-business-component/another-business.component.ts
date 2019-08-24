import { Component, Inject, Optional } from '@angular/core';
import { CUSTOM_INJECTOR_TOKEN } from '../../tokens';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-another-business',
  templateUrl: './another-business.component.html',
  styleUrls: ['./another-business.component.css']
})
export class AnotherBusinessComponent {

  constructor(
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) token: string
  ) {
    console.log('>> token value in another business component is:', token);
    apiService.doRequest('/another-business').subscribe(() => {}, () => {});
  }

}
