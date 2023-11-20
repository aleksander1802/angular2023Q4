import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteCustomCard } from 'src/app/store/actions/custom-card.actions';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
    @Input() item: VideoItem | null = null;

    constructor(private router: Router, private store: Store) {}

    onOpenDetailedPageById(itemId: string) {
        this.router.navigate(['/youtube', itemId]);
    }

    onDeleteCustomCardById(cardId: string) {
        this.store.dispatch(deleteCustomCard({ cardId }));
    }
}
