import {
  Component,
  Inject,
  Optional,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CUSTOM_INJECTOR_TOKEN } from '../../tokens';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent {
  @ViewChild('testOutlet', { read: ViewContainerRef, static: true }) testOutlet: ViewContainerRef;
  constructor(
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) token: string
  ) {
    console.log('>> token value in business component is:', token);
    apiService.doRequest('/business-component').subscribe(() => {}, () => {});
  }
}
