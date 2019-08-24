import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { ValidatorsManager } from './validators-manager.class';

export type Validators = ValidatorFn | ValidatorFn[];
export type AsyncValidators = AsyncValidatorFn | AsyncValidatorFn[];

export interface ValidatorsList {
  [key: string]: ValidatorFn;
}

export interface AsyncValidatorsList {
  [key: string]: AsyncValidatorFn;
}

export interface VMAbstractControl extends AbstractControl {
  validatorManager: ValidatorsManager;
  get(path: Array<string|number>|string): VMAbstractControl | null;
}

export interface VMFormArray extends FormArray {
  validatorManager: ValidatorsManager;
  get(path: Array<string|number>|string): VMAbstractControl | null;
}

export interface VMFormControl extends FormControl {
  validatorManager: ValidatorsManager;
  get(path: Array<string|number>|string): VMAbstractControl | null;
}

export interface VMFormGroup extends FormGroup {
  validatorManager: ValidatorsManager;
  get(path: Array<string|number>|string): VMAbstractControl | null;
}
