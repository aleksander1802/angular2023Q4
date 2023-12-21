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

const mockResp = {
    nextPageToken: 'nextPageToken123',
    prevPageToken: 'prevPageToken456',
    items: [
        {
            id: 'videoId1',
            snippet: {
                title: 'Video Title 1',
                description: 'Video Description 1',
                thumbnails: {
                    default: {
                        url: 'thumbnail_url_1',
                        width: 120,
                        height: 90,
                    },
                },
            },
            statistics: {
                viewCount: 100,
                likeCount: 20,
                dislikeCount: 5,
            },
            favorite: false,
        },
    ],
};

describe('ResultsService - Next Page Token', () => {
    let resultsService: ResultsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
        });

        resultsService = TestBed.inject(ResultsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should get search results with next page token', (done) => {
        const mockResponse = mockResp;

        const token = 'nextPageToken123';

        resultsService.getNextPageToken = jest.fn().mockReturnValue(token);

        resultsService
            .fetchSearchResults('test', { nextPageToken: token })
            .subscribe((response) => {
                expect(response).toEqual(mockResponse.items);

                expect(resultsService.getNextPageToken()).toEqual(
                    mockResponse.nextPageToken
                );
                expect(resultsService.getPrevPageToken()).toEqual(
                    mockResponse.prevPageToken
                );

                done();
            });

        const req = httpTestingController.expectOne(
            (request) => request.url.includes('search') && request.method === 'GET'
        );

        req.flush(mockResponse);
    });

    it('should get search results with prev page token', (done) => {
        const mockResponse = mockResp;

        const token = 'prevPageToken456';

        resultsService.getPrevPageToken = jest.fn().mockReturnValue(token);

        resultsService
            .fetchSearchResults('test', { prevPageToken: token })
            .subscribe((response) => {
                expect(response).toEqual(mockResponse.items);

                expect(resultsService.getNextPageToken()).toEqual(
                    mockResponse.nextPageToken
                );
                expect(resultsService.getPrevPageToken()).toEqual(
                    mockResponse.prevPageToken
                );

                done();
            });

        const req = httpTestingController.expectOne(
            (request) => request.url.includes('search') && request.method === 'GET'
        );

        req.flush(mockResponse);
    });
});
