import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
    catchError, map, mergeMap, switchMap
} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
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

    private buildSearchParams(query: string, pageToken?: PageTokens) {
        const queryLimit = '10';

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

    getGenerateConcatenatedVideoIds(items: SearchItem[]): string {
        return items.map(({ id }) => id.videoId).join(',');
    }

    getAllVideoItemsById(id: string): Observable<VideoItem[]> {
        const params = new HttpParams()
            .set('part', 'snippet,statistics')
            .set('id', id);
        return this.httpClient
            .get<SearchVideoResponse>(this.apiVideo, { params })
            .pipe(
                map((video) => video.items),
                catchError((error) => {
                    console.error('Error fetching video results:', error);
                    return throwError(() => 'Failed to fetch video results');
                })
            );
    }

    getVideoItemById(id: string): Observable<VideoItem[]> {
        const params = new HttpParams()
            .set('part', 'snippet,statistics')
            .set('id', id);

        return this.httpClient
            .get<SearchVideoResponse>(this.apiVideo, { params })
            .pipe(
                map((videoResponse) => videoResponse.items),
                catchError((error) => {
                    console.error('Error fetching search results:', error);
                    return throwError(() => 'Failed to fetch search results');
                })
            );
    }
}
