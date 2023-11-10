import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VideoItem } from 'src/app/youtube/models/search-item.model';
import { FilterService } from 'src/app/youtube/services/filter/filter.service';
import { ResultsService } from 'src/app/youtube/services/results/results.service';
import { SortService } from 'src/app/youtube/services/sort/sort.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    responseVideoItems$: Observable<VideoItem[]> | null = null;
    private onDestroy = new Subject<void>();

    constructor(
        private resultsService: ResultsService,
        public sortService: SortService,
        public filterService: FilterService
    ) {}

    ngOnInit() {
        this.responseVideoItems$ = this.resultsService
            .getSearchResults()
            .pipe(takeUntil(this.onDestroy));
    }

    trackByFn(_index: number, responseItems: VideoItem) {
        return responseItems.id;
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
