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

    search(value: string) {
        this.resultsService.isResultsVisible = true;

        this.resultsService.getSearchResults(value.toLowerCase().trim());
    }

    onEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const { value } = event.target as HTMLInputElement;

            this.search(value.toLowerCase().trim());
        }
    }
}
