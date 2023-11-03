import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthPermissionsService {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        return this.router.navigate(['/login']);
    }
}

export const AuthGuard: CanActivateFn = () => inject(AuthPermissionsService).canActivate();
