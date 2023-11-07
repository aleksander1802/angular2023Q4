import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly authTokenKey = 'authToken';
    currentLogin = 'Your name';

    login(username: string, password: string): boolean {
        if (username.trim() && password.trim()) {
            localStorage.setItem(this.authTokenKey, 'fake-auth-token12345678');
            this.currentLogin = username;
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(this.authTokenKey);
        this.currentLogin = 'Your name';
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.authTokenKey);
    }
}
