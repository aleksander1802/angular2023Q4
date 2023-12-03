import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginInformationBlockComponent } from './login-information-block.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('LoginInformationBlockComponent', () => {
    let component: LoginInformationBlockComponent;
    let fixture: ComponentFixture<LoginInformationBlockComponent>;
    let mockRouter: { navigate: jest.Mock };
    let mockAuthService: {
        isLoggedIn$: BehaviorSubject<boolean>;
        logout: jest.Mock;
    };

    beforeEach(() => {
        mockRouter = { navigate: jest.fn() };
        mockAuthService = {
            isLoggedIn$: new BehaviorSubject<boolean>(false),
            logout: jest.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: AuthService, useValue: mockAuthService },
            ],
        });

        fixture = TestBed.createComponent(LoginInformationBlockComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle login status', () => {
        component.isLoggedIn = false;

        component.ngOnInit();

        mockAuthService.isLoggedIn$.next(true);

        component.toggleLoginStatus();

        expect(mockAuthService.logout).toHaveBeenCalled();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should navigate to admin or login based on login status', () => {
        component.isLoggedIn = true;

        component.toFormCreation();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);

        component.isLoggedIn = false;

        component.toFormCreation();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
});
