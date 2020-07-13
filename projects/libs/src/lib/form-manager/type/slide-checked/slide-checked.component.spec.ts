import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCheckedComponent } from './slide-checked.component';

describe('SlideCheckedComponent', () => {
  let component: SlideCheckedComponent;
  let fixture: ComponentFixture<SlideCheckedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideCheckedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
