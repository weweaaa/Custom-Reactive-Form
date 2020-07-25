import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiaInputComponent } from './jia-input.component';

describe('JiaInputComponent', () => {
  let component: JiaInputComponent;
  let fixture: ComponentFixture<JiaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiaInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
