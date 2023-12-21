import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

TestBed.configureTestingModule({
    imports: [RouterTestingModule],
});

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let router: Router;

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set isSortSettingsVisible to true on button click', () => {
        expect(component.isSortSettingsVisible).toBeFalsy();

        component.toggleSortSetting();

        expect(component.isSortSettingsVisible).toBeTruthy();
    });

    it('should navigate to /favorite on button click', () => {
        const navigateSpy = jest.spyOn(router, 'navigate');
        const button = fixture.nativeElement.querySelector(
            '.header__favorite__icon'
        );

        button.click();

        expect(navigateSpy).toHaveBeenCalledWith(['/favorite']);
    });
});
