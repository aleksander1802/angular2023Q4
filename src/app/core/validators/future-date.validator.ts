import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function currentDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const inputDate = new Date(control.value);
        const currentDate = new Date();

        if (inputDate > currentDate) {
            return { futureDate: true };
        }

        return null;
    };
}
