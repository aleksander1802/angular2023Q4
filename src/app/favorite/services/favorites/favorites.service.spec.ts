import '@angular/compiler';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { FavoritesService } from './favorites.service';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('FavoritesService', () => {
    let favoritesService: FavoritesService;
    let httpTestingController: HttpTestingController;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [FavoritesService],
        });

        favoritesService = TestBed.inject(FavoritesService);
        httpTestingController = TestBed.inject(HttpTestingController);
        store = TestBed.inject(Store);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(favoritesService).toBeTruthy();
    });

    it('should fetch favorite video items by id', () => {
        const mockVideoId = 'favoriteId1';
        const mockResponse = {
            items: [{ id: mockVideoId, snippet: {}, statistics: {} }],
        };

        jest.spyOn(store, 'select').mockReturnValue(of([mockVideoId]));

        favoritesService
            .getFavoriteVideoItemsById(mockVideoId)
            .subscribe((response) => {
                expect(response[0].id).toBe(mockVideoId);
                expect(response[0].favorite).toBe(true);
            });

        const req = httpTestingController.expectOne(
            `${favoritesService.apiVideoLink}?part=snippet,statistics&id=${mockVideoId}`
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should handle error when fetching video items', () => {
        const mockVideoId = 'Fjes1-qhehs2-beqveq3-qerq5';

        jest.spyOn(store, 'select').mockReturnValue(of([]));

        favoritesService.getFavoriteVideoItemsById(mockVideoId).subscribe({
            error: (error) => {
                expect(error).toBe('Failed to fetch video results');
            },
        });

        const req = httpTestingController.expectOne(
            `${favoritesService.apiVideoLink}?part=snippet,statistics&id=${mockVideoId}`
        );
        expect(req.request.method).toBe('GET');
        req.error(new ProgressEvent('error'));
    });
});

afterAll(() => {
    jest.restoreAllMocks();
});
