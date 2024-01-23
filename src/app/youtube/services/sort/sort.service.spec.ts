import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { SortService, SortOrder } from './sort.service';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

TestBed.configureTestingModule({
    providers: [SortService],
});

describe('SortService', () => {
    let sortService: SortService;

    beforeEach(() => {
        sortService = TestBed.inject(SortService);
    });

    it('SortService should be created', () => {
        expect(sortService).toBeTruthy();
    });

    it('should initialize sortBy and sortOrder in the constructor', () => {
        expect(sortService.sortBy).toBe('');
        expect(sortService.sortOrder).toBe('asc');
    });

    it('should set sortBy and toggle sortOrder on sortByDate', () => {
        const eventMock: Partial<Event> = { preventDefault: jest.fn() };

        sortService.sortByDate(eventMock as Event);

        expect(sortService.sortBy).toBe('date');
        expect(sortService.sortOrder).toBe('desc');
    });

    it('should set sortBy and toggle sortOrder on sortByViews', () => {
        const eventMock: Partial<Event> = { preventDefault: jest.fn() };

        sortService.sortByViews(eventMock as Event);

        expect(sortService.sortBy).toBe('views');
        expect(sortService.sortOrder).toBe('desc');
    });

    it('should return current sortOrder', () => {
        const initialSortOrder: SortOrder = sortService.getCurrentSortOrder();
        expect(initialSortOrder).toBe('asc');

        sortService.sortOrder = 'desc';

        const updatedSortOrder: SortOrder = sortService.getCurrentSortOrder();
        expect(updatedSortOrder).toBe('desc');
    });
});
