import { Component } from '@angular/core';
import { ResultsService } from 'src/app/youtube/services/results/results.service';

@Component({
    selector: 'app-header-search-block',
    templateUrl: './header-search-block.component.html',
    styleUrls: ['./header-search-block.component.scss'],
})
export class HeaderSearchBlockComponent {
    searchQuery = '';

    constructor(private resultsService: ResultsService) {}

    onSearchInput() {
        if (this.searchQuery.length > 3) {
            this.resultsService.isResultsVisible = true;

            this.resultsService.getSearchResults(
                this.searchQuery.toLowerCase().trim()
            );
        }
    }
}
