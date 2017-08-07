import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
    selector: '[sfhValidateEqual][formControlName],[sfhValidateEqual][formControl],[sfhValidateEqual][ngModel]',
    providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEqualDirective), multi: true}]
})
export class ValidateEqualDirective implements Validator {

    constructor(@Attribute('sfhValidateEqual') public validateEqual: string) {
    }

    validate(control: AbstractControl): {[key: string]: any} {
        let value = control.value;

        let e = control.root.get(this.validateEqual);

        if (e && e.value !== value) {
            return {
                sfhValidateEqual: false
            }
        }
        return null;
    }
}
