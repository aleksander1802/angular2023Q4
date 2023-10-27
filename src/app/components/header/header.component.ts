import { Component } from '@angular/core';
import { ResultsService } from 'src/app/services/results.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    isSortSettingsVisible = false;
    searchQuery = '';

    constructor(private resultsService: ResultsService) {}

    search(value: string) {
        this.resultsService.isResultsVisible = true;

        this.resultsService.getSearchResults(value.trim());
    }

    onEnterKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const { value } = event.target as HTMLInputElement;

            this.search(value);
        }
    }
}
