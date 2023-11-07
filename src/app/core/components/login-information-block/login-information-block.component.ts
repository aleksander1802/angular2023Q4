import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-login-information-block',
    templateUrl: './login-information-block.component.html',
    styleUrls: ['./login-information-block.component.scss'],
})
export class LoginInformationBlockComponent {
    constructor(private router: Router, public authService: AuthService) {}

    logout() {
        if (this.authService.isLoggedIn()) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }
    }
}
