import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ValidatorsManager } from './validators-manager.class';
import { VMFormArray, VMFormControl, VMFormGroup } from './vm.interface';

@Injectable()
export class VMFormBuilder extends FormBuilder {
  group(controlsConfig, options?): VMFormGroup {
    const group: VMFormGroup = super.group(controlsConfig, options) as VMFormGroup;
    group.validatorManager = new ValidatorsManager(group, options);

    return group;
  }

  control(formState, validatorOrOpts?, asyncValidator?): VMFormControl {
    const control: VMFormControl = super.control(formState, validatorOrOpts, asyncValidator) as VMFormControl;
    control.validatorManager = new ValidatorsManager(control, validatorOrOpts, asyncValidator);

    return control;
  }

  array(controlsConfig, validatorOrOpts?, asyncValidator?): VMFormArray {
    const array: VMFormArray = super.array(controlsConfig, validatorOrOpts, asyncValidator) as VMFormArray;
    array.validatorManager = new ValidatorsManager(array, validatorOrOpts, asyncValidator);

    return array;
  }
}
