import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function noWhitespaceValidator(
    control: AbstractControl
): ValidationErrors | null {
    if (control.value && control.value.trim().length === 0) {
        return { whitespace: true };
    }
    return null;
}

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    form!: FormGroup;
    isSubmited = false;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.form = new FormGroup({
            login: new FormControl(null, [
                Validators.required,
                Validators.maxLength(40),
                noWhitespaceValidator,
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        const { login, password } = this.form.value;
        const loggedIn = this.authService.login(login, password);

        if (loggedIn) {
            this.form.reset();
            this.router.navigate(['/youtube']);
            this.isSubmited = false;
        } else {
            this.isSubmited = false;
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
