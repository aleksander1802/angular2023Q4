import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as VideoCardActions from 'src/app/store/actions/video-cards.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResultsService } from '../../services/results/results.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
    currentPage = 1;
    isPrevPageButtonDisable = false;
    isNextPageButtonDisable = false;

    private destroy$ = new Subject<void>();

    constructor(private store: Store, private resultService: ResultsService) {}

    ngOnInit() {
        const storedPage = localStorage.getItem('currentPage');
        this.currentPage = storedPage ? +storedPage : 1;

        this.resultService.prevPageToken$
            .pipe(takeUntil(this.destroy$))
            .subscribe((token) => {
                this.isPrevPageButtonDisable = token === null;
            });

        this.resultService.nextPageToken$
            .pipe(takeUntil(this.destroy$))
            .subscribe((token) => {
                this.isNextPageButtonDisable = token === null;
            });
    }

    nextPage() {
        this.currentPage += 1;
        localStorage.setItem('currentPage', this.currentPage.toString());
        this.store.dispatch(VideoCardActions.getNextPage());
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            localStorage.setItem('currentPage', this.currentPage.toString());
            this.store.dispatch(VideoCardActions.getPrevPage());
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
