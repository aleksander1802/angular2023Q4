import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    Subject, debounceTime, distinctUntilChanged, takeUntil
} from 'rxjs';
import { getVideoCard } from '../../../store/actions/video-cards.actions';
import { AuthService } from '../../../auth/services/auth.service';
import { ResultsService } from '../../../youtube/services/results/results.service';

@Component({
    selector: 'app-header-search-block',
    templateUrl: './header-search-block.component.html',
    styleUrls: ['./header-search-block.component.scss'],
})
export class HeaderSearchBlockComponent implements OnInit, OnDestroy {
    searchQuery = '';
    private destroy$ = new Subject<void>();
    private searchSubject = new Subject<string>();
    private minQueryLength = 3;
    private debounceDelay = 1000;

    constructor(
        private authService: AuthService,
        private resultsService: ResultsService,
        private store: Store
    ) {}
    ngOnInit() {
        this.searchSubject
            .pipe(
                debounceTime(this.debounceDelay),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((query) => {
                if (
                    query.length >= this.minQueryLength
                    && this.authService.isLoggedIn()
                ) {
                    this.resultsService.searchInputValueSubject.next(query);
                    this.store.dispatch(getVideoCard());
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
