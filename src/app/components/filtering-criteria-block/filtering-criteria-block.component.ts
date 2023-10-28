import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { SortService } from 'src/app/services/sort/sort.service';

@Component({
    selector: 'app-filtering-criteria-block',
    templateUrl: './filtering-criteria-block.component.html',
    styleUrls: ['./filtering-criteria-block.component.scss'],
})
export class FilteringCriteriaBlockComponent {
    activeSorting = '';

    constructor(
        public sortService: SortService,
        public filterService: FilterService
    ) {}

    setActiveSorting(type: string) {
        this.activeSorting = type;
    }

    getLinkClass(type: string): string {
        return this.activeSorting === type ? 'active' : '';
    }
}
