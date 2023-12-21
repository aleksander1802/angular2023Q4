import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const { value } = control;

        try {
            const url = new URL(value);
            if (url.href !== value) {
                return { invalidUrl: true };
            }
        } catch (error) {
            return { invalidUrl: true };
        }

        return null;
    };
}
