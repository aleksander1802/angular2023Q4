import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { deleteCustomCard } from 'src/app/store/actions/custom-card.actions';
import { selectCustomCardById } from 'src/app/store/selectors/custom-card.selectors';
import { VideoItem } from '../../models/search-item.model';
import { ResultsService } from '../../services/results/results.service';

@Component({
    selector: 'app-detailed-information-page',
    templateUrl: './detailed-information-page.component.html',
    styleUrls: ['./detailed-information-page.component.scss'],
})
export class DetailedInformationPageComponent implements OnInit, OnDestroy {
    detailedSub = new Subject<void>();
    currentItemId = '';
    currentItem: VideoItem | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private resultsService: ResultsService,
        private store: Store
    ) {}

    ngOnInit() {
        this.listenToRouteParams();
    }

    private listenToRouteParams() {
        this.activatedRoute.params
            .pipe(takeUntil(this.detailedSub))
            .subscribe((params) => {
                this.currentItemId = params['id'];
                this.fetchCurrentItem();
            });
    }

    private fetchCurrentItem() {
        this.store
            .pipe(
                select(selectCustomCardById(this.currentItemId)),
                takeUntil(this.detailedSub),
                first()
            )
            .subscribe((currentCard) => {
                if (currentCard) {
                    this.currentItem = currentCard;
                } else {
                    this.fetchItemById();
                }
            });
    }

    private fetchItemById() {
        this.resultsService.getVideoItemById(this.currentItemId).subscribe({
            next: ([firstItem]) => {
                if (firstItem) {
                    this.currentItem = firstItem;
                } else {
                    this.handleItemNotFound();
                }
            },
            error: (error) => {
                console.error('Error fetching video item:', error);
            },
        });
    }

    onDeleteCustomCardById(cardId: string) {
        this.store.dispatch(deleteCustomCard({ cardId }));

        this.store
            .pipe(
                select(selectCustomCardById(cardId)),
                takeUntil(this.detailedSub),
                first()
            )
            .subscribe((currentCard) => {
                if (!currentCard) {
                    this.backToMain();
                }
            })
            .unsubscribe();
    }

    private handleItemNotFound() {
        this.router.navigate(['**'], { skipLocationChange: true });
    }

    backToMain() {
        this.router.navigate(['/youtube']);
    }

    ngOnDestroy() {
        this.detailedSub.next();
        this.detailedSub.complete();
    }
}
