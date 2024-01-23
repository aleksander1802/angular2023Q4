import { Component } from '@angular/core';
import { SortService } from '../../../youtube/services/sort/sort.service';
import { FilterService } from '../../../youtube/services/filter/filter.service';

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

    handleSortByDate(event: Event) {
        this.sortService.sortByDate(event);
        this.setActiveSorting('date');
    }

    handleSortByViews(event: Event) {
        this.sortService.sortByViews(event);
        this.setActiveSorting('views');
    }

    getLinkClass(type: string): string {
        return this.activeSorting === type ? 'active' : '';
    }
}
