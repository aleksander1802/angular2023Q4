import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { AuthService } from '../../services/auth.service';
import { LoginPageComponent } from './login-page.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, RouterTestingModule],
});

describe('LoginPageComponent functionality', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;
    let authService: AuthService;

    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        component.ngOnInit();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should set isSubmitted to false on form submission', () => {
        component.onSubmit();
        expect(component.isSubmitted).toBe(false);
    });

    it('should call authService.login on form submission', () => {
        const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(true);

        component.form.setValue({
            email: 'test@example.com',
            password: '!fw1fgaWwbesVw24!',
        });

        component.onSubmit();

        expect(loginSpy).toHaveBeenCalledWith(
            'test@example.com',
            '!fw1fgaWwbesVw24!'
        );
    });

    it('should handle failed login by resetting the form and setting isSubmitted to false', () => {
        jest.spyOn(authService, 'login').mockReturnValue(false);

        component.onSubmit();
        expect(component.form.valid).toBeFalsy();
        expect(component.isSubmitted).toBe(false);
    });
});
