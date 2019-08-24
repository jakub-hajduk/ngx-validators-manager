import { VMFormBuilder} from "./vm-form-builder";
import { VMFormGroup, VMFormArray, VMAbstractControl  } from "./vm.interface";
import { Validators, AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { of } from "rxjs";

function hasProperties(object: any) {
    return object.hasOwnProperty('validatorManager')
        && object.hasOwnProperty('validator')
        && object.hasOwnProperty('asyncValidator')
}

function fakeAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => of(null);
}

describe('FormBuilder class', () => {
    const formBuilder = new VMFormBuilder();

    describe('control()', () => {
        it('should create form control containing ValidatorManager instance', () => {
            const control: VMAbstractControl = formBuilder.control('field');

            expect(hasProperties(control)).toEqual(true);
        });

        it('should accept validators passed as method parameters', () => {
            const control: VMAbstractControl = formBuilder.control('field',
                    {maxLength: Validators.maxLength(3)},
                    {async: fakeAsyncValidator()}
                );
            const validators = control.validatorManager.getValidators();
            const asyncValidators = control.validatorManager.getAsyncValidators();

            expect(Object.keys(validators)).toEqual(['maxLength']);
            expect(Object.keys(asyncValidators)).toEqual(['async']);
        });
    });

    describe('group()', () => {
        let group: VMFormGroup;

        beforeAll(() => {
            group = formBuilder.group({
                firstField: '',
                secondField: ['',
                    {
                        required: Validators.required
                    },
                    {
                        async: fakeAsyncValidator()
                    }
                ]
            });
        });

        it('should create form group containing ValidatorManager instance', () => {
            expect(hasProperties(group)).toEqual(true);
        });

        it('created group should contain controls with ValidatorManager instance', () => {
            const firstControl = group.get('firstField');
            const secondControl = group.get('secondField');

            expect(hasProperties(firstControl)).toEqual(true);
            expect(hasProperties(secondControl)).toEqual(true);
        });

        it('should accept validators passed in options array', () => {
            const secondField = group.get('secondField');
            const validators = secondField.validatorManager.getValidators();
            const asyncValidators = secondField.validatorManager.getAsyncValidators();

            expect(Object.keys(validators)).toEqual(['required']);
            expect(Object.keys(asyncValidators)).toEqual(['async']);
        });
    });

    describe('array()', () => {
        let array: VMFormArray;

        beforeAll(() => {
            array = formBuilder.array([
                formBuilder.control(''),
                formBuilder.control('')
            ]);
        });

        it('should create regular ReactiveForm group array containing ValidatorManager instance', () => {
            expect(hasProperties(array)).toEqual(true);
        });

        it('should contain controls with ValidatorManager instances', () => {
            const firstField = array.controls[0];
            const secondField = array.controls[1];

            expect(hasProperties(firstField)).toEqual(true);
        });
    });
});