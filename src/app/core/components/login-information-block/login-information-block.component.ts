import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-login-information-block',
    templateUrl: './login-information-block.component.html',
    styleUrls: ['./login-information-block.component.scss'],
})
export class LoginInformationBlockComponent implements OnInit {
    isLoggedIn = false;

    constructor(private router: Router, public authService: AuthService) {}

    ngOnInit() {
        this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
        });
    }

    toggleLoginStatus() {
        if (this.isLoggedIn) {
            this.authService.logout();
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}
