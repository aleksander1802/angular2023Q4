import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchItem } from 'src/app/youtube/models/search-item.model';
import { FilterService } from 'src/app/youtube/services/filter/filter.service';
import { ResultsService } from 'src/app/youtube/services/results/results.service';
import { SortService } from 'src/app/youtube/services/sort/sort.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    responseItems: SearchItem[] = [];
    searchResultSub$: Subscription | undefined;

    constructor(
        private resultsService: ResultsService,
        public sortService: SortService,
        public filterService: FilterService
    ) {}

    ngOnInit() {
        this.searchResultSub$ = this.resultsService.searchResults.subscribe(
            (items) => {
                this.responseItems = items;
            }
        );
    }

    trackByFn(_index: number, responseItems: SearchItem) {
        return responseItems.id;
    }

    ngOnDestroy(): void {
        if (this.searchResultSub$) {
            this.searchResultSub$.unsubscribe();
        }
    }
}
