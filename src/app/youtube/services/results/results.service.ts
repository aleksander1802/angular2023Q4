import { Injectable } from '@angular/core';
import {
    BehaviorSubject, Observable, of, throwError
} from 'rxjs';
import {
    catchError,
    map,
    mergeMap,
    switchMap,
    withLatestFrom,
} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectVideoCardFavoriteIds } from '../../../store/selectors/video-cards.selectors';
import { URL_SEARCH, URL_VIDEOS } from '../../../../../constants';
import {
    PageTokens,
    SearchResultResponse,
    SearchVideoResponse,
} from '../../models/search-response.model';
import { SearchItem, VideoItem } from '../../models/search-item.model';

@Injectable({
    providedIn: 'root',
})
export class ResultsService {
    private apiUrl = URL_SEARCH;
    private apiVideo = URL_VIDEOS;

    private nextPageTokenSubject = new BehaviorSubject<string | null>(null);
    private prevPageTokenSubject = new BehaviorSubject<string | null>(null);

    nextPageToken$ = this.nextPageTokenSubject.asObservable();
    prevPageToken$ = this.prevPageTokenSubject.asObservable();

    searchInputValueSubject = new BehaviorSubject<string>('');

    public searchResultsSubject$!: Observable<SearchResultResponse[]>;

    constructor(private httpClient: HttpClient, private store: Store) {}

    getSearchResults(token?: PageTokens) {
        return this.searchInputValueSubject.pipe(
            mergeMap((value) => this.fetchSearchResults(value, token)),
            map((items) => this.getGenerateConcatenatedVideoIds(items)),
            switchMap((itemId) => this.getAllVideoItemsById(itemId))
        );
    }

    getNextPageToken() {
        return this.nextPageTokenSubject.value;
    }

    getPrevPageToken() {
        return this.prevPageTokenSubject.value;
    }

    fetchSearchResults(query: string, pageToken?: PageTokens) {
        const params = this.buildSearchParams(query, pageToken);

        return this.httpClient
            .get<SearchResultResponse>(this.apiUrl, { params })
            .pipe(
                map((response) => this.handleSearchResponse(response)),
                catchError(() => this.handleSearchError())
            );
    }

    buildSearchParams(query: string, pageToken?: PageTokens) {
        const queryLimit = '20';

        let params = new HttpParams()
            .set('q', query)
            .set('part', 'snippet')
            .set('type', 'video')
            .set('maxResults', queryLimit);

        if (pageToken) {
            const nextPageToken = this.getNextPageToken();
            const prevPageToken = this.getPrevPageToken();

            if ('nextPageToken' in pageToken && nextPageToken) {
                params = params.append('pageToken', nextPageToken);
            }

            if ('prevPageToken' in pageToken && prevPageToken) {
                params = params.append('pageToken', prevPageToken);
            }
        }

        return params;
    }

    private handleSearchResponse(response: SearchResultResponse) {
        this.setNextPageToken(response.nextPageToken || null);
        this.setPrevPageToken(response.prevPageToken || null);

        return response.items;
    }

    private handleSearchError() {
        return throwError(() => 'Failed to fetch search results');
    }

    setNextPageToken(token: string | null) {
        this.nextPageTokenSubject.next(token);
    }

    setPrevPageToken(token: string | null) {
        this.prevPageTokenSubject.next(token);
    }

    getNextPageResults() {
        const token = this.getNextPageToken();

        return this.getSearchResults({ nextPageToken: token });
    }

    getPrevPageResults() {
        const token = this.getPrevPageToken();

        return this.getSearchResults({ prevPageToken: token });
    }

    getGenerateConcatenatedVideoIds(items: SearchItem[]) {
        return items.map(({ id }) => id.videoId).join(',');
    }

    getAllVideoItemsById(id: string) {
        const params = new HttpParams()
            .set('part', 'snippet,statistics')
            .set('id', id);

        return this.httpClient
            .get<SearchVideoResponse>(this.apiVideo, { params })
            .pipe(
                switchMap((video) => this.addFavoriteFieldToVideoItems(video.items)),
                catchError((error) => this.handleVideoItemsError(error))
            );
    }

    private addFavoriteFieldToVideoItems(videoItems: VideoItem[]) {
        return of(videoItems).pipe(
            withLatestFrom(this.store.select(selectVideoCardFavoriteIds)),
            map(([items, favoriteIds]) => this.mapVideoItemsWithFavoriteField(items, favoriteIds))
        );
    }

    private mapVideoItemsWithFavoriteField(
        videoItems: VideoItem[],
        favoriteIds: string[]
    ) {
        return videoItems.map((item) => ({
            ...item,
            favorite: favoriteIds.includes(item.id) || false,
        }));
    }

    private handleVideoItemsError(error: Error) {
        console.error('Error fetching video results:', error);
        return throwError(() => 'Failed to fetch video results');
    }

    getVideoItemById(id: string) {
        const params = new HttpParams()
            .set('part', 'snippet,statistics')
            .set('id', id);

        return this.httpClient
            .get<SearchVideoResponse>(this.apiVideo, { params })
            .pipe(
                withLatestFrom(this.store.select(selectVideoCardFavoriteIds)),
                switchMap(([videoResponse, favoriteIds]) => {
                    const videoItems = videoResponse.items;

                    const videosWithFavorites = videoItems.map((item) => ({
                        ...item,
                        favorite: favoriteIds.includes(item.id) || false,
                    }));

                    return of(videosWithFavorites);
                }),
                catchError((error) => {
                    console.error('Error fetching video results:', error);
                    return throwError(() => 'Failed to fetch video results');
                })
            );
    }
}
