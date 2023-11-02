import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInformationBlockComponent } from './login-information-block.component';

describe('LoginInformationBlockComponent', () => {
    let component: LoginInformationBlockComponent;
    let fixture: ComponentFixture<LoginInformationBlockComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginInformationBlockComponent],
        });
        fixture = TestBed.createComponent(LoginInformationBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
