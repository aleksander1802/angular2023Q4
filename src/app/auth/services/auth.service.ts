import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly authTokenKey = 'authToken';
    private readonly usernameKey = 'username';
    currentLogin = 'Your name';

    constructor() {
        const savedUsername = localStorage.getItem(this.usernameKey);
        this.currentLogin = savedUsername || 'Your name';
    }

    login(username: string, password: string): boolean {
        if (username.trim() && password.trim()) {
            localStorage.setItem(this.authTokenKey, 'fake-auth-token12345678');
            localStorage.setItem(this.usernameKey, username);
            this.currentLogin = username;
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.usernameKey);
        this.currentLogin = 'Your name';
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.authTokenKey);
    }
}
