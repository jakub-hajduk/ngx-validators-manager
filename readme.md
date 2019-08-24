# ngx-validators-manager

Validators manager for Angular Reactive Forms.

```
$ npm install ngx-validators-manager --save
```

## Usage

### Module import:
```typescript
import { NgxValidatorsManagerModule } from 'NgxValidatorsManager';
```

```typescript
@NgModule({
  imports: [
    NgxValidatorsManagerModule
  ],
  ...
})
export class AppModule { }
```

### Component: 
```typescript
import { VMFormBuilder, VMFormGroup } from 'NgxValidatorsManager';
```

```typescript
@Component({
  ...
})
export class AppComponent implements OnInit {
  form: VMFormGroup;

  constructor(private fb: VMFormBuilder) {
  }
}

```

```typescript
addRequiredValdiator() {
    this.form.get('field').validatorManager.addValidators({required: Validators.required});
}
```

```typescript
getValidators() {
    const validators = this.form.get('field').validatorManager.getValidators();
    ...
}
```

```typescript
removeRequiredValdiator() {
    this.form.get('field').validatorManager.removeValidators('required');
}
```