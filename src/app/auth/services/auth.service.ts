import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly authTokenKey = 'authToken';

    login(username: string, password: string): boolean {
        if (username.trim() && password.trim()) {
            localStorage.setItem(this.authTokenKey, 'fake-auth-token12345678');
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(this.authTokenKey);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.authTokenKey);
    }
}
