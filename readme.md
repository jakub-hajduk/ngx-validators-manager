# ngx-validators-manager

Validators manager for reactive forms in Angular.

## What problem does it solve?
In Angular You don't have an option, where You can add or remove single validators from controls, groups or arrays. Everything You add is composed using `composeValidators()` function.

NgxValidatorsManager was written to solve this problem, and add more control over validators. It tracks what validators were added, and if we add or remove any of them, it recomposes and reapplies validators on the `AbstractControl`.

## Install

```bash
$ npm install --save ngx-validators-manager
```

## Adding module
Just import `ngx-validators-manager` to Your project
```typescript
@NgModule({
  imports: [
    NgxValidatorsManagerModule
  ]
})
export class AppModule { }
```

## Using it
It basically adds `validatorManager` property to Your controls. That's why You have to use custom interfaces.

1. Import stuff
```typescript
import { VMFormBuilder, VMFormGroup } from 'ngx-validators-manager';
```

2. Use `VmFormBuilder`
```typescript
export class FormComponent {
  form: VMFormGroup; // Use VMFormGroup interface

  constructor(private fb: VMFormBuilder) { // Use VMFormBuilder
    this.form = this.fb.group({ // Create form with FormBuilder as usual
      firstName: ''
    });
  }
}
```
3. Add validators...
```typescript
  addRequired() {
    this.form.get('firstName').validatorManager.addValidators({required: Validators.required}) // Add validators
  }
```

4. ...and remove them.
```typescript
  removeRequired() {
    this.form.get('firstName').validatorManager.removeValidators('required'); // Remove validators
  }
```

You can play with it at [Stackblitz](https://stackblitz.com/edit/ngx-validators-manager-demo)