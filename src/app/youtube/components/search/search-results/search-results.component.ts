import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { selectCustomCardItems } from 'src/app/store/selectors/custom-card.selectors';
import { selectVideoCardItems } from 'src/app/store/selectors/video-cards.selectors';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { FilterService } from 'src/app/youtube/services/filter/filter.service';
import { SortService } from 'src/app/youtube/services/sort/sort.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    combinedVideoItems$: Observable<VideoItem[]> | null = null;
    private onDestroy = new Subject<void>();

    constructor(
        public sortService: SortService,
        public filterService: FilterService,
        private store: Store
    ) {}

    ngOnInit() {
        const searchResults$ = this.store
            .select(selectVideoCardItems)
            .pipe(startWith([]));

        const customCardItems$ = this.store.select(selectCustomCardItems);

        const firstPage = 1;

        this.combinedVideoItems$ = combineLatest([
            customCardItems$,
            searchResults$,
        ]).pipe(
            takeUntil(this.onDestroy),
            map(([customCardItems, searchResults]) => {
                const currentPage = this.getCurrentPage();
                const isFirstPage = currentPage === firstPage;

                const combinedItems = isFirstPage
                    ? [...customCardItems, ...searchResults]
                    : searchResults;

                return combinedItems.slice(0, 20);
            })
        );
    }

    trackByFn(_index: number, responseItems: VideoItem) {
        return responseItems.id;
    }

    private getCurrentPage(): number {
        const storedPage = localStorage.getItem('currentPage');

        return storedPage ? +storedPage : 1;
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
