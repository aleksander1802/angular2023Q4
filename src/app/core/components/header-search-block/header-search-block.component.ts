import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    Subject, debounceTime, distinctUntilChanged, takeUntil
} from 'rxjs';
import { ResultsService } from 'src/app/youtube/services/results/results.service';

@Component({
    selector: 'app-header-search-block',
    templateUrl: './header-search-block.component.html',
    styleUrls: ['./header-search-block.component.scss'],
})
export class HeaderSearchBlockComponent implements OnInit, OnDestroy {
    searchQuery = '';
    private destroy$ = new Subject<void>();
    private searchSubject = new Subject<string>();
    private debounceDelay = 1000;

    constructor(private resultsService: ResultsService) {}
    ngOnInit() {
        this.searchSubject
            .pipe(
                debounceTime(this.debounceDelay),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((query) => {
                if (query.length >= 3) {
                    this.resultsService.searchInputValueSubject.next(query);
                }
            });
    }

    onSearchInput() {
        this.searchSubject.next(this.searchQuery);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
