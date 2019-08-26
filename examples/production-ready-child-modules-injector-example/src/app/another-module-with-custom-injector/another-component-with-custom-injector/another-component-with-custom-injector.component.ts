import { Component, Inject, Optional } from '@angular/core';
import { CUSTOM_INJECTOR_TOKEN } from '../../tokens';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-another-component-with-custom-injector',
  templateUrl: './another-component-with-custom-injector.component.html',
  styleUrls: ['./another-component-with-custom-injector.component.css']
})
export class AnotherComponentWithCustomInjectorComponent {

  constructor(
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) token: string
  ) {
    // console.log('>> token another with custom injector value is:', token);
    apiService.doRequest('/another-with-custom-injector-request').subscribe(() => {}, () => {});
  }

}
