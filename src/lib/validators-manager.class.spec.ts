import { ValidatorsManager } from './validators-manager.class';
import { VMFormBuilder } from './vm-form-builder';
import { ValidatorsList, AsyncValidatorsList } from 'NgxValidatorsManager/public_api';
import { Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

function fakeAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => of(null);
}

describe('ValidatorsManager class', () => {
    const formBuilder = new VMFormBuilder();
    const control = formBuilder.control('field');
    const validatorsManager = control.validatorManager;

    beforeEach(() => {
        validatorsManager.clearValidators();
        validatorsManager.clearAsyncValidators();
        validatorsManager.setValidators({
            base: Validators.nullValidator
        });
        validatorsManager.setAsyncValidators({
            base: fakeAsyncValidator()
        });
    });

    it('addValidators() should add validators to list and return added validators', () => {
        const returnedValidators = validatorsManager.addValidators({
            require: Validators.required,
            maxLength: Validators.maxLength(3)
        });
        const validatorsList: ValidatorsList = validatorsManager.getValidators();

        expect(Object.keys(validatorsList)).toEqual(['base', 'require', 'maxLength']);
        expect(Object.keys(returnedValidators)).toEqual(['require', 'maxLength']);
    });

    it('addAsyncValidators() should add validators to async list and return added validators', () => {
        const returnedValidators = validatorsManager.addAsyncValidators({
            async: fakeAsyncValidator(),
            otherAsync: fakeAsyncValidator()
        });
        const validatorsList: AsyncValidatorsList = validatorsManager.getAsyncValidators();

        expect(Object.keys(validatorsList)).toEqual(['base', 'async', 'otherAsync']);
        expect(Object.keys(returnedValidators)).toEqual(['async', 'otherAsync']);
    });

    it('removeValidators() should remove validators from list and return removed validators', () => {
        validatorsManager.addValidators({
            require: Validators.required,
            maxLength: Validators.maxLength(3)
        });
        const returnedValidators = validatorsManager.removeValidators('maxLength');
        const validatorsList: ValidatorsList = validatorsManager.getValidators();

        expect(Object.keys(validatorsList)).toEqual(['base', 'require']);
        expect(Object.keys(returnedValidators)).toEqual(['maxLength']);
    });

    it('removeAsyncValidators() should remove async validators from list and return removed validators', () => {
        validatorsManager.addAsyncValidators({
            async: fakeAsyncValidator(),
            otherAsync: fakeAsyncValidator()
        });
        const returnedValidators = validatorsManager.removeAsyncValidators('async');
        const validatorsList: ValidatorsList = validatorsManager.getValidators();

        expect(Object.keys(validatorsList)).toEqual(['base', 'otherAsync']);
        expect(Object.keys(returnedValidators)).toEqual(['async']);
    });

    it('setValidators() should clear validators list and set given validators and return them', () => {
        validatorsManager.addValidators({
            requireTrue: Validators.requiredTrue,
            email: Validators.email
        });
        const returnedValidators = validatorsManager.setValidators({
            required: Validators.required,
            maxLength: Validators.maxLength(3)
        });
        const validatorsList: ValidatorsList = validatorsManager.getValidators();

        expect(Object.keys(validatorsList)).toEqual(['required', 'maxLength']);
        expect(Object.keys(returnedValidators)).toEqual(['required', 'maxLength']);
    });

    it('setAsyncValidators() should clear async validators list and set given validators and return them', () => {
        validatorsManager.addAsyncValidators({
            firstAsync: fakeAsyncValidator(),
            secondAsync: fakeAsyncValidator()
        });
        const returnedValidators = validatorsManager.setAsyncValidators({
            thirdAsync: fakeAsyncValidator(),
            fourthAsync: fakeAsyncValidator()
        });
        const validatorsList: ValidatorsList = validatorsManager.getAsyncValidators();

        expect(Object.keys(validatorsList)).toEqual(['thirdAsync', 'fourthAsync']);
        expect(Object.keys(returnedValidators)).toEqual(['thirdAsync', 'fourthAsync']);
    });

    it('getValidators() should return list of validators', () => {
        validatorsManager.addValidators({
            required: Validators.required
        });
        validatorsManager.addValidators({
            maxLength: Validators.maxLength(3)
        });
        validatorsManager.addValidators({
            email: Validators.email
        });
        const validatorsList: ValidatorsList = validatorsManager.getValidators();

        expect(Object.keys(validatorsList)).toEqual(['base', 'required', 'maxLength', 'email']);
    });

    it('getAsyncValidators() should return list of validators', () => {
        validatorsManager.addAsyncValidators({
            firstAsync: fakeAsyncValidator()
        });
        validatorsManager.addAsyncValidators({
            secondAsync: fakeAsyncValidator()
        });
        validatorsManager.addAsyncValidators({
            thirdAsync: fakeAsyncValidator()
        });
        const validatorsList: ValidatorsList = validatorsManager.getAsyncValidators();

        expect(Object.keys(validatorsList)).toEqual(['base', 'firstAsync', 'secondAsync', 'thirdAsync']);
    });
});
