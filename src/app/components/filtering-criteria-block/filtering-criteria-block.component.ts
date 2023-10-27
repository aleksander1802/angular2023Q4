import { Component } from '@angular/core';
import { SortService } from 'src/app/services/sort/sort.service';

@Component({
    selector: 'app-filtering-criteria-block',
    templateUrl: './filtering-criteria-block.component.html',
    styleUrls: ['./filtering-criteria-block.component.scss'],
})
export class FilteringCriteriaBlockComponent {
    activeSorting = '';

    constructor(public sortService: SortService) {}

    setActiveSorting(type: string) {
        this.activeSorting = type;
    }

    getLinkClass(type: string): string {
        return this.activeSorting === type ? 'active' : '';
    }
}
