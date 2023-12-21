import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { updateCustomCardStatus } from 'src/app/store/actions/custom-card.actions';
import { selectIsCustomCardSubmitted } from 'src/app/store/selectors/custom-card.selectors';

@Component({
    selector: 'app-custom-modal',
    templateUrl: './custom-modal.component.html',
    styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();

    isSubmitted$!: Observable<boolean>;

    constructor(private router: Router, private store: Store) {}

    ngOnInit() {
        this.isSubmitted$ = this.store
            .select(selectIsCustomCardSubmitted)
            .pipe(takeUntil(this.unsubscribe$));
    }

    onCloseModal() {
        this.store.dispatch(updateCustomCardStatus());
    }

    toMainPage() {
        this.onCloseModal();
        this.router.navigateByUrl('/youtube');
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
