import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { CyberButtonComponent } from './cyber-button.component';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);
describe('CyberButtonComponent', () => {
    let component: CyberButtonComponent;
    let fixture: ComponentFixture<CyberButtonComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(CyberButtonComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default value for buttonText input', () => {
        expect(component.buttonText).toBe('');
    });
});
