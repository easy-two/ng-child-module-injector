import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherComponentWithCustomInjectorComponent } from './another-component-with-custom-injector.component';

describe('AnotherComponentWithCustomInjectorComponent', () => {
  let component: AnotherComponentWithCustomInjectorComponent;
  let fixture: ComponentFixture<AnotherComponentWithCustomInjectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotherComponentWithCustomInjectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherComponentWithCustomInjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
