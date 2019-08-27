import {Compiler, Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {ApiService} from '../../../../shared/api/api.service';
import {CUSTOM_INJECTOR_TOKEN} from '../../../../tokens';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-with-custom-injector-inner',
  templateUrl: './with-custom-injector-inner.component.html',
  styleUrls: ['./with-custom-injector-inner.component.css']
})
export class WithCustomInjectorInnerComponent {

  constructor(
    private injector: Injector,
    private compiler: Compiler,
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) public token: string,
    private http: HttpClient
  ) {
    // console.log('>> token with custom inner injector value is:', token);
    apiService.doRequest(this.reqUrl).subscribe(() => {}, () => {});
    http.get(this.httpClientReqUrl).subscribe();
  }

  reqUrl = '/inner-with-custom-injector-request';
  httpClientReqUrl = '/poopa';
}
