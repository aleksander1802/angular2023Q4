import { Component, OnInit } from '@angular/core';
import { SearchItem } from 'src/app/models/search-item.model';
import { ResultsService } from 'src/app/services/results/results.service';
import { SortService } from 'src/app/services/sort/sort.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    responseItems: SearchItem[] = [];

    constructor(
        private resultsService: ResultsService,
        public sortService: SortService
    ) {}

    ngOnInit() {
        this.resultsService.searchResults.subscribe((items) => {
            this.responseItems = items;
        });
    }

    trackByFn(_index: number, responseItems: SearchItem) {
        return responseItems.id;
    }
}
