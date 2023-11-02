import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItem } from 'src/app/youtube/models/search-item.model';

@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
    @Input() item!: SearchItem;

    constructor(private router: Router) {}

    onOpenDetailedPageById(itemId: string) {
        this.router.navigate(['/youtube', itemId]);
    }
}
