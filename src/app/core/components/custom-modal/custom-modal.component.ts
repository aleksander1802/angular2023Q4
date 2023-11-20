import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateCustomCardStatus } from 'src/app/store/actions/custom-card.actions';
import { selectIsCustomCardSubmitted } from 'src/app/store/selectors/custom-card.selectors';

@Component({
    selector: 'app-custom-modal',
    templateUrl: './custom-modal.component.html',
    styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnInit {
    isSubmitted$!: Observable<boolean>;

    constructor(private router: Router, private store: Store) {}

    ngOnInit() {
        this.isSubmitted$ = this.store.select(selectIsCustomCardSubmitted);
    }

    onCloseModal() {
        this.store.dispatch(updateCustomCardStatus());
    }

    toMainPage() {
        this.onCloseModal();
        this.router.navigate(['/youtube']);
    }
}
