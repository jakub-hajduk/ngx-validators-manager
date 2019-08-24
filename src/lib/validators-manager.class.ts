import { mapToValidatorsObject, extractValidators, toArray, isValidatorsObject } from './vm.utils';
import { VMAbstractControl, AsyncValidatorsList, ValidatorsList } from './vm.interface';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export class ValidatorsManager {
   validatorsList: ValidatorsList;
   asyncValidatorsList: AsyncValidatorsList;

   constructor(private control: VMAbstractControl,
                validatorOrOptions?,
                asyncValidators?) {
      if (validatorOrOptions && validatorOrOptions.hasOwnProperty('validators')) {
        console.log('są alidatorry')
        this.setValidators(validatorOrOptions.validators);
      }

      if (validatorOrOptions && isValidatorsObject(validatorOrOptions)) {
        this.setValidators(validatorOrOptions)
      }

      if (validatorOrOptions && validatorOrOptions.hasOwnProperty('asyncValidators')) {
        console.log('są asynki wali')
        this.setAsyncValidators(validatorOrOptions.asyncValidators);
      }

      if (asyncValidators && isValidatorsObject(asyncValidators)) {
        this.setAsyncValidators(asyncValidators);
      }
   }

   addValidators(validators: ValidatorsList): ValidatorsList {
    const mappedValidators = validators;
    this.validatorsList = {...this.validatorsList, ...mappedValidators};
    this.setValidators(this.validatorsList);
    return mappedValidators;
   }

   removeValidators(key: string | string[]): ValidatorsList {
     const output: ValidatorsList = {};

     toArray(key).forEach((validatorKey: string) => {
       output[validatorKey] = this.validatorsList[validatorKey];
       delete this.validatorsList[validatorKey];
     });

     this.setValidators(this.validatorsList);

     return output;
   }

   setValidators(validators: ValidatorsList): ValidatorsList {
     this.validatorsList = validators;
     this.control.setValidators(extractValidators(this.validatorsList));
     this.control.updateValueAndValidity();
     return this.validatorsList;
   }

   getValidators(): ValidatorsList {
     return this.validatorsList;
   }

   clearValidators() {
     this.validatorsList = {};
     this.setValidators(this.validatorsList);
   }

   addAsyncValidators(validators: AsyncValidatorsList): AsyncValidatorsList {
    const mappedValidators = validators;
    this.asyncValidatorsList = {...this.asyncValidatorsList, ...mappedValidators};
    this.setAsyncValidators(this.asyncValidatorsList);
    return mappedValidators;
   }

   removeAsyncValidators(key: string | string[]): AsyncValidatorsList {
     const output: AsyncValidatorsList = {};

     toArray(key).forEach((validatorKey: string) => {
       output[validatorKey] = this.asyncValidatorsList[validatorKey];
       delete this.asyncValidatorsList[validatorKey];
     });

     this.setValidators(this.asyncValidatorsList);

     return output;
   }

   setAsyncValidators(validators: AsyncValidatorsList): AsyncValidatorsList {
     this.asyncValidatorsList = validators;
     this.control.setAsyncValidators(extractValidators(this.asyncValidatorsList) as AsyncValidatorFn[]);
     this.control.updateValueAndValidity();
     return this.asyncValidatorsList;
   }

   getAsyncValidators(): AsyncValidatorsList {
     return this.asyncValidatorsList;
   }

   clearAsyncValidators() {
     this.asyncValidatorsList = {};
     this.setAsyncValidators(this.asyncValidatorsList);
   }
}
