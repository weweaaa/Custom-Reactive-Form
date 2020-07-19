import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeydownInputComponent } from './keydown-input.component';

describe('KeydownInputComponent', () => {
  let component: KeydownInputComponent;
  let fixture: ComponentFixture<KeydownInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeydownInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeydownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
