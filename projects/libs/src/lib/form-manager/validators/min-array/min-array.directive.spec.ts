import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinArrayDirective } from './min-array.directive';
import { MaterialModule } from '../../../material.module';

@Component({ selector: 'lib-host-comp' })
class HostComponent {
  @ViewChild('tMySelect') tMySelectNgModel: NgModel;

  form = new FormGroup({
    minArray: new FormControl('')
  });
  minArrayControl = new FormControl('');
}

describe('MinArrayDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, MinArrayDirective],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule
      ]
    });
  }));

  function createComponent() {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }

  describe('ngModel', () => {
    let optionElms: HTMLElement[];

    beforeEach(() => {
      TestBed.overrideComponent(HostComponent, {
        set: {
          template: `
                  <mat-selection-list #tMySelect="ngModel" ngModel name="mySelect" [minArray]="3" >
                      選單
                      <mat-list-option id="A" value="A"> A!! </mat-list-option>
                      <mat-list-option id="B" value="B"> B!! </mat-list-option>
                      <mat-list-option id="C" value="C"> C!! </mat-list-option>
                  </mat-selection-list>

                <p style="color: red;">
                    Options selected: {{tMySelect.selectedOptions?.selected.length}}
                  </p>
            `
        }
      });
      createComponent();
    });

    beforeEach(() => {
      const options = fixture.debugElement.queryAll(By.css('mat-list-option'));
      optionElms = options.map<HTMLElement>(x => x.nativeElement);
    });

    function update(values: string[]) {
      for (const optionElm of optionElms) {
        if (values.includes(optionElm.id)) {
          optionElm.click();
          tick();
          fixture.detectChanges();
        }
      }
    }

    it('["A", "C"] should not be 2 MinArray', fakeAsync(() => {
      update(['A', 'C']);
      expect(host.tMySelectNgModel.errors).toEqual({ minArray: true });
      expect(host.tMySelectNgModel.hasError('minArray')).toBeTruthy();
    }));

    it('["A", "B", "C"] should be 3 MinArray', fakeAsync(() => {
      update(['A', 'B', 'C']);
      expect(host.tMySelectNgModel.errors).toBeNull();
      expect(host.tMySelectNgModel.hasError('minArray')).toBeFalsy();
    }));
  });

  describe('formControlName', () => {
    let minArrayControl: AbstractControl;

    beforeEach(() => {
      TestBed.overrideComponent(HostComponent, {
        set: {
          template: `
            <form [formGroup]="form">
              <input formControlName="minArray" minArray minArray=3 />
            </form>
          `
        }
      });
      createComponent();
    });

    beforeEach(() => {
      minArrayControl = host.form.get('minArray');
    });

    function update(value: string[]) {
      minArrayControl.setValue(value);
    }

    it('["A", "B", "C"] should be MinArray', () => {
      update(['A', 'B', 'C']);
      expect(minArrayControl.errors).toBeNull();
      expect(minArrayControl.hasError('minArray')).toBeFalsy();
    });
  });

  describe('formControl', () => {
    beforeEach(() => {
      TestBed.overrideComponent(HostComponent, {
        set: {
          template: `<input [formControl]="minArrayControl" minArray minArray=3 />`
        }
      });
      createComponent();
    });

    function update(value: string[]) {
      host.minArrayControl.setValue(value);
    }

    it('["A", "B", "C"] should be MinArray', () => {
      update(['A', 'B', 'C']);
      expect(host.minArrayControl.errors).toBeNull();
      expect(host.minArrayControl.hasError('minArray')).toBeFalsy();
    });
  });
});
