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

TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, StoreModule.forRoot({})],
});

describe('ResultsService', () => {
    let resultsService: ResultsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        resultsService = TestBed.inject(ResultsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(resultsService).toBeTruthy();
    });
});
