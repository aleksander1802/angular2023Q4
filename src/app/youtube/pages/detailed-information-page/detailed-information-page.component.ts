import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResultsService } from '../../services/results/results.service';
import { SearchItem } from '../../models/search-item.model';

@Component({
    selector: 'app-detailed-information-page',
    templateUrl: './detailed-information-page.component.html',
    styleUrls: ['./detailed-information-page.component.scss'],
})
export class DetailedInformationPageComponent implements OnInit, OnDestroy {
    detailedSub = new Subject<void>();
    currentItemId = '';
    currentItem: SearchItem | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private resultsService: ResultsService
    ) {}

    ngOnInit() {
        this.activatedRoute.params
            .pipe(takeUntil(this.detailedSub))
            .subscribe((params) => {
                this.currentItemId = params['id'];
                const item = this.resultsService.getItemById(
                    this.currentItemId
                );

                if (item) {
                    this.currentItem = item;
                } else {
                    this.router.navigate(['**'], { skipLocationChange: true });
                }
            });
    }

    backToMain() {
        this.router.navigate(['/youtube']);
    }

    ngOnDestroy(): void {
        this.detailedSub.next();
        this.detailedSub.complete();
    }
}
