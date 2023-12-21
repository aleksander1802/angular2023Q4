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

TestBed.configureTestingModule({
    providers: [AuthService],
});

describe('AuthService - Initialization', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    it('should initialize currentLogin from localStorage', () => {
        const savedUsername = 'Your name';
        authService.setUsernameInLocalStorage(savedUsername);

        expect(authService.currentLogin).toBe(savedUsername);
    });
});
