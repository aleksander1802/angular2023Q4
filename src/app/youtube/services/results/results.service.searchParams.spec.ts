import { TestBed } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { ResultsService } from './results.service';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('ResultsService - buildSearchParams', () => {
    let resultsService: ResultsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
        });
        resultsService = TestBed.inject(ResultsService);
    });

    it('should build search params with nextPageToken', () => {
        const query = 'test';
        const nextPageToken = 'nextPageToken';

        const params = resultsService.buildSearchParams(query, {
            nextPageToken,
        });

        expect(params instanceof HttpParams).toBeTruthy();
        expect(params.get('q')).toBe(query);
        expect(params.get('pageToken')).toBe(null);
    });

    it('should build search params without nextPageToken', () => {
        const query = 'test';

        const params = resultsService.buildSearchParams(query);

        expect(params instanceof HttpParams).toBeTruthy();
        expect(params.get('q')).toBe(query);
        expect(params.get('pageToken')).toBeFalsy();
    });
});
