import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    selectIsVideoCardsLoading,
    selectVideoCardItems,
} from 'src/app/store/selectors/video-cards.selectors';
import { VideoItem } from '../../models/search-item.model';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
    videoItems$: Observable<VideoItem[]> | undefined;
    isVideosItems = false;
    isLoading$!: Observable<boolean>;
    private destroy$ = new Subject<void>();

    constructor(private store: Store) {}

    ngOnInit() {
        this.isLoading$ = this.store.select(selectIsVideoCardsLoading);

        this.videoItems$ = this.store.pipe(select(selectVideoCardItems));

        if (this.videoItems$) {
            this.videoItems$
                .pipe(takeUntil(this.destroy$))
                .subscribe((items) => {
                    this.isVideosItems = items.length > 0;
                });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
