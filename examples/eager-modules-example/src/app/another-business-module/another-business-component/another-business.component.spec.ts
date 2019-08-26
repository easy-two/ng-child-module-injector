import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherBusinessComponent } from './another-business.component';

describe('AnotherComponentWithCustomInjectorComponent', () => {
  let component: AnotherBusinessComponent;
  let fixture: ComponentFixture<AnotherBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotherBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
