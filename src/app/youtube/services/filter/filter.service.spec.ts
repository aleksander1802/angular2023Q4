import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { FilterService } from './filter.service';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('FilterService', () => {
    let filterService: FilterService;

    beforeEach(() => {
        filterService = TestBed.inject(FilterService);
    });

    it('should be created', () => {
        expect(filterService).toBeTruthy();
    });

    it('should have an initial empty filterValue', () => {
        expect(filterService.filterValue).toEqual('');
    });

    it('should update filterValue', () => {
        filterService.filterValue = 'example';
        expect(filterService.filterValue).toEqual('example');
    });
});
