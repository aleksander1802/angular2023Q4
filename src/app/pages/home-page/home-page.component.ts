import { Component } from '@angular/core';
import { ResultsService } from 'src/app/services/results.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
    constructor(private resultsService: ResultsService) {}

    isResultsVisible() {
        return this.resultsService.isResultsVisible;
    }
}
