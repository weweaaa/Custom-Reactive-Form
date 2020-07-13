import { Component, OnInit, Input } from '@angular/core';
import { ControlItem, ControlType } from './form-manager.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  set dataSource(v: Array<ControlItem<ControlType>>) {

    const controlsConfig = v.reduce((obj, { id, disabled, value, controlType, validatorList }) => {

      if ([ControlType.CheckBox, ControlType.RadioButtonList, ControlType.SlideChecked].includes(controlType)) {
        value = value ? value : false;
      }

      if (validatorList) {
        return { ...obj, [id]: [{ value, disabled: !!disabled }, validatorList.map((val) => val.valid)] };
      } else {
        return { ...obj, [id]: [{ value, disabled: !!disabled }] };
      }

    }, {});

    this.form = this.fb.group(controlsConfig);
    this._dataSource = v;
  }
  private _dataSource: Array<ControlItem<ControlType>>;

  form: FormGroup;
  readonly cType = ControlType;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }
}
