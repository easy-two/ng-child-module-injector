import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithCustomInjectorComponent } from './with-custom-injector.component';

describe('WithCustomInjectorComponent', () => {
  let component: WithCustomInjectorComponent;
  let fixture: ComponentFixture<WithCustomInjectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithCustomInjectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithCustomInjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
