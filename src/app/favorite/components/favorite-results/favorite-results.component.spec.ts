import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteResultsComponent } from './favorite-results.component';

describe('FavoriteResultsComponent', () => {
    let component: FavoriteResultsComponent;
    let fixture: ComponentFixture<FavoriteResultsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FavoriteResultsComponent],
        });
        fixture = TestBed.createComponent(FavoriteResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
