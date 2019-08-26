import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithCustomInjectorInnerComponent } from './with-custom-injector-inner.component';

describe('WithCustomInjectorInnerComponent', () => {
  let component: WithCustomInjectorInnerComponent;
  let fixture: ComponentFixture<WithCustomInjectorInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithCustomInjectorInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithCustomInjectorInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
