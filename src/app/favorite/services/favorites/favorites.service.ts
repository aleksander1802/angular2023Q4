import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    switchMap,
    catchError,
    of,
    map,
    throwError,
    withLatestFrom,
} from 'rxjs';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { SearchVideoResponse } from 'src/app/youtube/models/search-response.model';
import { Store } from '@ngrx/store';
import { selectVideoCardFavoriteIds } from '../../../store/selectors/video-cards.selectors';
import { URL_VIDEOS } from '../../../../../constants';

@Injectable({
    providedIn: 'root',
})
export class FavoritesService {
    private apiVideo = URL_VIDEOS;

    constructor(private httpClient: HttpClient, private store: Store) {}

    get apiVideoLink() {
        return this.apiVideo;
    }

    getFavoriteVideoItemsById(id: string) {
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
}
