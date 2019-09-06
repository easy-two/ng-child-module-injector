import {
  Compiler,
  Component, Inject,
  Injector, Input, Optional,
} from '@angular/core';
import { CUSTOM_INJECTOR_TOKEN } from '../../tokens';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-with-custom-injector',
  templateUrl: './with-custom-injector.component.html',
  styleUrls: ['./with-custom-injector.component.css']
})
export class WithCustomInjectorComponent {
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) public token: string
  ) {
    apiService.doRequest(this.reqUrl).subscribe(() => {}, () => {});
  }

  reqUrl = '/with-custom-injector-request';

  @Input() message;
}
