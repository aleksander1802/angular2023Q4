import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginPermissionsService {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate() {
        if (!this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/youtube']);
        return false;
    }
}

export const LoginGuard: CanActivateFn = () => inject(LoginPermissionsService).canActivate();
