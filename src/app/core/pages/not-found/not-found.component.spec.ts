import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { NotFoundComponent } from './not-found.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;
    let routerMock: { navigate: jest.Mock };

    beforeEach(() => {
        routerMock = { navigate: jest.fn() };

        TestBed.configureTestingModule({
            providers: [{ provide: Router, useValue: routerMock }],
        });

        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to main page on calling redirectToMainPage', () => {
        component.redirectToMainPage();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/youtube']);
    });

    it('should navigate to main page on pressing Enter key', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter' });

        component.redirectToMainPageOnEnter(event);

        expect(routerMock.navigate).toHaveBeenCalledWith(['/youtube']);
    });

    it('should not navigate on pressing non-Enter key', () => {
        const event = new KeyboardEvent('keydown', { key: 'Space' });

        component.redirectToMainPageOnEnter(event);

        expect(routerMock.navigate).not.toHaveBeenCalled();
    });
});
