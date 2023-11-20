import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { selectVideoCardFavoriteIds } from 'src/app/store/selectors/video-cards.selectors';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { FilterService } from 'src/app/youtube/services/filter/filter.service';
import { SortService } from 'src/app/youtube/services/sort/sort.service';
import { FavoritesService } from '../../services/favorites/favorites.service';

@Component({
    selector: 'app-favorite-results',
    templateUrl: './favorite-results.component.html',
    styleUrls: ['./favorite-results.component.scss'],
})
export class FavoriteResultsComponent implements OnInit, OnDestroy {
    favoriteIds$!: Observable<string[]>;
    favoriteVideoItems$: Observable<VideoItem[]> | null = null;

    private onDestroy = new Subject<void>();

    constructor(
        public sortService: SortService,
        public filterService: FilterService,
        private favoritesService: FavoritesService,
        private store: Store
    ) {}

    ngOnInit() {
        this.favoriteVideoItems$ = this.store.pipe(
            select(selectVideoCardFavoriteIds),

            switchMap((ids) => {
                const favoriteIdsString = ids.join(',');

                if (favoriteIdsString.length > 0) {
                    return this.favoritesService
                        .getFavoriteVideoItemsById(favoriteIdsString)
                        .pipe(
                            map((videoItems) => videoItems.filter((item) => item.favorite))
                        );
                }

                return of([]);
            }),
            takeUntil(this.onDestroy)
        );
    }

    trackByFn(_index: number, responseItems: VideoItem) {
        return responseItems.id;
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
