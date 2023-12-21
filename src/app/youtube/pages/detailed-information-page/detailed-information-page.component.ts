import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCustomCardById } from 'src/app/store/selectors/custom-card.selectors';
import { deleteCustomCard } from 'src/app/store/actions/custom-card.actions';
import { first, map, startWith } from 'rxjs/operators';
import {
    removeFromFavorites,
    addToFavorites,
} from 'src/app/store/actions/video-cards.actions';
import { Location } from '@angular/common';
import { selectVideoCardFavoriteIds } from '../../../store/selectors/video-cards.selectors';
import { ResultsService } from '../../services/results/results.service';
import { VideoItem } from '../../models/search-item.model';

@Component({
    selector: 'app-detailed-information-page',
    templateUrl: './detailed-information-page.component.html',
    styleUrls: ['./detailed-information-page.component.scss'],
})
export class DetailedInformationPageComponent implements OnInit, OnDestroy {
    private detailedSub = new Subject<void>();
    currentItemId = '';
    currentItem: VideoItem | undefined;
    isFavorite$ = this.store.select(selectVideoCardFavoriteIds).pipe(
        map((favoriteIds) => {
            if (this.currentItem) {
                return favoriteIds.includes(this.currentItem.id) || false;
            }
            return false;
        }),
        startWith(false)
    );

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private resultsService: ResultsService,
        private store: Store,
        private location: Location
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
        this.location.back();
    }

    onFavoriteCardToggle(item: VideoItem) {
        const videoId = item.id;

        if (item.favorite) {
            this.store.dispatch(removeFromFavorites({ videoId }));

            if (this.currentItem) {
                this.currentItem.favorite = false;
            }
        } else {
            this.store.dispatch(addToFavorites({ videoId }));

            if (this.currentItem) {
                this.currentItem.favorite = true;
            }
        }
    }

    ngOnDestroy() {
        this.detailedSub.next();
        this.detailedSub.complete();
    }
}
