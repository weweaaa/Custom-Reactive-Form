import { Component, OnInit, Input } from '@angular/core';
import { ControlItem, ControlType } from './form-manager.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss']
})
export class FormManagerComponent implements OnInit {

  @Input()
  get dataSource() {
    return this._dataSource;
  }
  set dataSource(v: Array<ControlItem>) {

    const controlsConfig = v.reduce((obj, { id, disabled, value }) => {

      return { ...obj, [id]: { value, disabled: !!disabled } };

      // return { ...obj, [id]: this.fb.control({ value, disabled: !!disabled }) };

    }, {});

    this.form = this.fb.group(controlsConfig);
    this._dataSource = v;
  }
  private _dataSource: Array<ControlItem>;

  form: FormGroup;

  readonly cType = ControlType;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
