import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { FilteringCriteriaBlockComponent } from './filtering-criteria-block.component';
import {
    SortOrder,
    SortService,
} from '../../../youtube/services/sort/sort.service';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('FilteringCriteriaBlockComponent', () => {
    let component: FilteringCriteriaBlockComponent;
    let fixture: ComponentFixture<FilteringCriteriaBlockComponent>;
    let sortService: SortService;

    beforeEach(() => {
        fixture = TestBed.createComponent(FilteringCriteriaBlockComponent);
        component = fixture.componentInstance;
        sortService = TestBed.inject(SortService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set activeSorting when calling setActiveSorting', () => {
        const type = 'date';
        component.setActiveSorting(type);
        expect(component.activeSorting).toEqual(type);
    });

    it('should call sortService.sortByDate and setActiveSorting when calling handleSortByDate', () => {
        const sortSpy = jest.spyOn(sortService, 'sortByDate');
        const setActiveSortingSpy = jest.spyOn(component, 'setActiveSorting');

        const event = new Event('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        component.handleSortByDate(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(sortSpy).toHaveBeenCalledWith(event);
        expect(setActiveSortingSpy).toHaveBeenCalledWith('date');
    });

    it('should call sortService.sortByViews and setActiveSorting when calling handleSortByViews', () => {
        const sortSpy = jest.spyOn(sortService, 'sortByViews');
        const setActiveSortingSpy = jest.spyOn(component, 'setActiveSorting');

        const event = new Event('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        component.handleSortByViews(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(sortSpy).toHaveBeenCalledWith(event);
        expect(setActiveSortingSpy).toHaveBeenCalledWith('views');
    });

    it('should return "active" when getLinkClass is called with the activeSorting type', () => {
        const type = 'date';
        component.activeSorting = type;

        const result = component.getLinkClass(type);

        expect(result).toEqual('active');
    });

    it('should return an empty string when getLinkClass is called with a non-activeSorting type', () => {
        const type = 'date';
        component.activeSorting = 'views';

        const result = component.getLinkClass(type);

        expect(result).toEqual('');
    });

    it('should return the current sort order when calling getCurrentSortOrder', () => {
        const expectedSortOrder: SortOrder = 'asc';
        sortService.sortOrder = expectedSortOrder;

        const result = sortService.getCurrentSortOrder();

        expect(result).toEqual(expectedSortOrder);
    });
});
