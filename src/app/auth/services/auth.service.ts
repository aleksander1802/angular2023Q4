import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly authTokenKey = 'authToken';
    private readonly usernameKey = 'username';
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    isLoggedIn$ = this.isLoggedInSubject.asObservable();
    currentLogin = 'Your name';

    constructor() {
        const savedUsername = localStorage.getItem(this.usernameKey);
        this.currentLogin = savedUsername || 'Your name';
    }

    login(username: string, password: string): boolean {
        if (username.trim() && password.trim()) {
            localStorage.setItem(this.authTokenKey, 'fake-auth-token12345678');

            this.setUsernameInLocalStorage(username);
            this.currentLogin = username;
            this.isLoggedInSubject.next(true);
            return true;
        }
        return false;
    }

    getUsernameKey() {
        return this.usernameKey;
    }

    setUsernameInLocalStorage(username: string) {
        const key = this.getUsernameKey();
        localStorage.setItem(key, username);
    }

    logout() {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.usernameKey);
        this.currentLogin = 'Your name';
        this.isLoggedInSubject.next(false);
    }

    isLoggedIn(): boolean {
        return Boolean(localStorage.getItem(this.authTokenKey));
    }
}
