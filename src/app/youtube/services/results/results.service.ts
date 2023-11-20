import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
    catchError, map, mergeMap, switchMap
} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { URL_SEARCH, URL_VIDEOS } from '../../../../../constants';
import {
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

    searchInputValueSubject = new BehaviorSubject<string>('');

    public searchResultsSubject$!: Observable<SearchResultResponse[]>;

    constructor(private httpClient: HttpClient, private store: Store) {}

    getSearchResults() {
        return this.searchInputValueSubject.pipe(
            mergeMap((value) => this.fetchSearchResults(value)),
            map((items) => this.getGenerateConcatenatedVideoIds(items)),
            switchMap((itemId) => this.getAllVideoItemsById(itemId))
        );
    }

    fetchSearchResults(query: string) {
        const params = this.buildSearchParams(query);

        return this.httpClient
            .get<SearchResultResponse>(this.apiUrl, { params })
            .pipe(
                map((response) => this.handleSearchResponse(response)),
                catchError(() => this.handleSearchError())
            );
    }

    private buildSearchParams(query: string) {
        const queryLimit = '10';

        const params = new HttpParams()
            .set('q', query)
            .set('part', 'snippet')
            .set('type', 'video')
            .set('maxResults', queryLimit);

        return params;
    }

    private handleSearchResponse(response: SearchResultResponse) {
        return response.items;
    }

    private handleSearchError() {
        return throwError(() => 'Failed to fetch search results');
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
