import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordValidator } from '../../validators/password.validator';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                passwordValidator(),
            ]),
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        this.isSubmitted = true;

        const { email, password } = this.form.value;
        const loggedIn = this.authService.login(email, password);

        if (loggedIn) {
            this.handleSuccessfulLogin();
        } else {
            this.handleFailedLogin();
        }
    }

    handleSuccessfulLogin() {
        this.form.reset();
        this.router.navigate(['/youtube']);
        this.isSubmitted = false;
    }

    handleFailedLogin() {
        this.isSubmitted = false;
    }

    getError(controlName: string, errorName: string) {
        return this.form.get(controlName)?.hasError(errorName);
    }
}
