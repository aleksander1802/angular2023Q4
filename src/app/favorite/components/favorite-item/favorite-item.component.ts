import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { removeFromFavorites } from 'src/app/store/actions/video-cards.actions';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

@Component({
    selector: 'app-favorite-item',
    templateUrl: './favorite-item.component.html',
    styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent {
    @Input() item: VideoItem | null = null;

    constructor(private router: Router, private store: Store) {}

    removeFavoriteCard(item: VideoItem) {
        const videoId = item.id;

        this.store.dispatch(removeFromFavorites({ videoId }));
    }

    onOpenDetailedPageById(itemId: string) {
        this.router.navigate(['/youtube', itemId]);
    }
}
