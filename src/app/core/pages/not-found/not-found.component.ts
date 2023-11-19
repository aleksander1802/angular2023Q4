import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
    constructor(private router: Router) {}

    redirectToMainPage() {
        this.router.navigate(['/youtube']);
    }

    redirectToMainPageOnEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.redirectToMainPage();
        }
    }
}
