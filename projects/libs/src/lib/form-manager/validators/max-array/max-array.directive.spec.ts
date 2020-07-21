import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaxArrayDirective } from './max-array.directive';
import { MaterialModule } from '../../../material.module';

@Component({ selector: 'lib-host-comp' })
class HostComponent {
  @ViewChild('tMySelect') tMySelectNgModel: NgModel;
  form = new FormGroup({
    maxArray: new FormControl('')
  });
  maxArrayControl = new FormControl('');
}

fdescribe('MaxArrayDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, MaxArrayDirective],
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
                <mat-selection-list #tMySelect="ngModel" ngModel name="mySelect" [maxArray]="2" >
                    選單
                    <mat-list-option id="A" value="A"> A!! </mat-list-option>
                    <mat-list-option id="B" value="B"> B!! </mat-list-option>
                    <mat-list-option id="C" value="C"> C!! </mat-list-option>
                </mat-selection-list>
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

    it('["A", "C"] should be 2 MaxArray', fakeAsync(() => {
      update(['A', 'C']);
      expect(host.tMySelectNgModel.errors).toBeNull();
      expect(host.tMySelectNgModel.hasError('maxArray')).toBeFalsy();
    }));

    it('["A", "B", "C"] should not be 3 MaxArray', fakeAsync(() => {
      update(['A', 'B', 'C']);
      expect(host.tMySelectNgModel.errors).toEqual({ maxArray: true });
      expect(host.tMySelectNgModel.hasError('maxArray')).toBeTruthy();
    }));
  });

  describe('formControlName', () => {
    let maxArrayControl: AbstractControl;

    beforeEach(() => {
      TestBed.overrideComponent(HostComponent, {
        set: {
          template: `
            <form [formGroup]="form">
              <input formControlName="maxArray" maxArray maxArray=3 />
            </form>
          `
        }
      });
      createComponent();
    });

    beforeEach(() => {
      maxArrayControl = host.form.get('maxArray');
    });

    function update(value: string[]) {
      maxArrayControl.setValue(value);
    }

    it('["A", "B", "C"] should be MaxArray', () => {
      update(['A', 'B', 'C']);
      expect(maxArrayControl.errors).toBeNull();
      expect(maxArrayControl.hasError('maxArray')).toBeFalsy();
    });
  });

  describe('formControl', () => {
    beforeEach(() => {
      TestBed.overrideComponent(HostComponent, {
        set: {
          template: `<input [formControl]="maxArrayControl" maxArray maxArray=3 />`
        }
      });
      createComponent();
    });

    function update(value: string[]) {
      host.maxArrayControl.setValue(value);
    }

    it('["A", "B", "C"] should be MaxArray', () => {
      update(['A', 'B', 'C']);
      expect(host.maxArrayControl.errors).toBeNull();
      expect(host.maxArrayControl.hasError('maxArray')).toBeFalsy();
    });
  });
});
