import { ValidatorsList, AsyncValidatorsList } from './vm.interface';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

function everyValueIsFunction(object) {
    for (const key in object) {
        if (typeof object[key] !== 'function') {
            return false;
        }
    }
    return true;
}

export function isValidatorsObject(object) {
    return object && object.constructor === Object && everyValueIsFunction(object);
}

function isValidatorsArray(object) {
    return object && Array.isArray(object) && everyValueIsFunction(object);
}

export function toArray(value) {
    return Array.isArray(value) ? value : [value];
}

export function mapToValidatorsObject(value) {
    if (isValidatorsArray(value)) {
        return Object.create(value);
    }
    if (isValidatorsObject(value)) {
        return value;
    }
    if (typeof value === 'function') {
        return {0: value};
    }
    return {};
}

export function extractValidators(object: ValidatorsList | AsyncValidatorsList): AsyncValidatorFn[] | ValidatorFn[] {
    return (Object as any).values(object);
}
