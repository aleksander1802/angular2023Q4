import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { deleteCustomCard } from 'src/app/store/actions/custom-card.actions';
import {
    removeFromFavorites,
    addToFavorites,
} from 'src/app/store/actions/video-cards.actions';
import { selectVideoCardFavoriteIds } from 'src/app/store/selectors/video-cards.selectors';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
    @Input() item: VideoItem | null = null;

    isFavorite$ = this.store.select(selectVideoCardFavoriteIds).pipe(
        map((favoriteIds) => {
            if (this.item) {
                return favoriteIds.includes(this.item.id) || false;
            }
            return false;
        }),
        startWith(false),
        distinctUntilChanged()
    );

    constructor(private router: Router, private store: Store) {}

    onOpenDetailedPageById(itemId: string) {
        this.router.navigate(['/youtube', itemId]);
    }

    onDeleteCustomCardById(cardId: string) {
        this.store.dispatch(deleteCustomCard({ cardId }));
    }

    onFavoriteCardToggle(item: VideoItem) {
        const videoId = item.id;

        if (item.favorite) {
            this.store.dispatch(removeFromFavorites({ videoId }));
        } else {
            this.store.dispatch(addToFavorites({ videoId }));
        }
    }
}
