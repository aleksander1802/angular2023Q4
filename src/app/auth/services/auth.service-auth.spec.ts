import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { AuthService } from './auth.service';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('AuthService - Authentication', () => {
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
        });
        authService = TestBed.inject(AuthService);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should log in successfully with valid credentials', () => {
        const username = 'async1@mail.ru';
        const password = 'PassW0)Rd!';

        const loggedIn = authService.login(username, password);

        expect(loggedIn).toBe(true);
        expect(authService.isLoggedIn()).toBe(true);
        expect(authService.currentLogin).toBe(username);
    });

    it('should not log in with empty credentials', () => {
        const loggedIn = authService.login('', '');

        expect(loggedIn).toBe(false);
        expect(authService.isLoggedIn()).toBe(false);
        expect(authService.currentLogin).toBe('Your name');
    });

    it('should log out successfully', () => {
        authService.login('async1@mail.ru', 'PassW0)Rd!');

        authService.logout();

        expect(authService.isLoggedIn()).toBe(false);
        expect(authService.currentLogin).toBe('Your name');
    });
});
