import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResultsService } from '../../services/results/results.service';
import { VideoItem } from '../../models/search-item.model';

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
        private resultsService: ResultsService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.pipe(takeUntil(this.detailedSub)).subscribe({
            next: (params) => {
                this.currentItemId = params['id'];
                this.resultsService
                    .getVideoItemById(this.currentItemId)
                    .subscribe({
                        next: ([firstItem]) => {
                            if (firstItem) {
                                this.currentItem = firstItem;
                            } else {
                                this.router.navigate(['**'], {
                                    skipLocationChange: true,
                                });
                            }
                        },
                        error: (error) => {
                            console.error('Error fetching video item:', error);
                        },
                    });
            },
        });
    }

    backToMain() {
        this.router.navigate(['/youtube']);
    }

    ngOnDestroy() {
        this.detailedSub.next();
        this.detailedSub.complete();
    }
}
