import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { StoreModule } from '@ngrx/store';
import { ResultsService } from './results.service';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

describe('ResultsService - Fetch Error', () => {
    let resultsService: ResultsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
        });

        resultsService = TestBed.inject(ResultsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should handle search error and return a default error message', (done) => {
        const query = 'test';

        resultsService.fetchSearchResults(query).subscribe({
            error: (error: string) => {
                expect(error).toEqual('Failed to fetch search results');
                done();
            },
        });

        const req = httpTestingController.expectOne(
            (request) => request.url.includes('search') && request.method === 'GET'
        );

        req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle search error and return a custom error message', (done) => {
        const query = 'test';

        const customErrorMessage = 'Failed to fetch search results';

        resultsService.fetchSearchResults(query).subscribe({
            error: (error: string) => {
                expect(error).toEqual(customErrorMessage);
                done();
            },
        });

        const req = httpTestingController.expectOne(
            (request) => request.url.includes('search') && request.method === 'GET'
        );

        req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
