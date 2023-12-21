import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { CustomButtonComponent } from './custom-button.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('CustomButtonComponent', () => {
    let component: CustomButtonComponent;
    let fixture: ComponentFixture<CustomButtonComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomButtonComponent);
        component = fixture.componentInstance;
    });

    it('CustomButtonComponent should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values for inputs', () => {
        expect(component.additionalClasses).toBe('');
        expect(component.disabled).toBeUndefined();
    });
});
