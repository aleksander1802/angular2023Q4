import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { LoginPageComponent } from './login-page.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('LoginPageComponent initialization', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, RouterTestingModule],
        });

        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;

        component.ngOnInit();
    });

    it('LoginPageComponent should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid initially', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('email and password should be invalid initially', () => {
        const { email } = component;
        const { password } = component;

        expect(email?.valid).toBeFalsy();
        expect(password?.valid).toBeFalsy();
    });
});
