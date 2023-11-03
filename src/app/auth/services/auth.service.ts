import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn = false;

    login() {
        this.loggedIn = true;
        return of(true);
    }

    logout() {
        this.loggedIn = false;
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
