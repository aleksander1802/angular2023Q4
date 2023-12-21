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

const mockItems = [
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
    {
        id: 'videoId2',
        snippet: {
            title: 'Video Title 2',
            description: 'Video Description 2',
            thumbnails: {
                default: {
                    url: 'thumbnail_url_2',
                    width: 120,
                    height: 90,
                },
            },
        },
        statistics: {
            viewCount: 150,
            likeCount: 30,
            favotires: 10,
        },
        favorite: true,
    },
];

describe('ResultsService - Fetch Success', () => {
    let resultsService: ResultsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        resultsService = TestBed.inject(ResultsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should fetch search results successfully', (done) => {
        const mockResponse = {
            items: mockItems,
        };

        resultsService.fetchSearchResults('test').subscribe((response) => {
            expect(response).toEqual(mockResponse.items);

            expect(resultsService.getNextPageToken()).toBeNull();
            expect(resultsService.getPrevPageToken()).toBeNull();

            done();
        });

        const req = httpTestingController.expectOne(
            (request) => request.url.includes('search') && request.method === 'GET'
        );

        req.flush(mockResponse);
    });
});
