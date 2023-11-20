import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    isSortSettingsVisible = false;

    constructor(private router: Router) {}

    navigateToFavoritePage() {
        this.router.navigate(['/favorite']);
    }
}
