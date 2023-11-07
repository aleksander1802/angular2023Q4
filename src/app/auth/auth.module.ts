import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPermissionsService } from './guards/auth.guard';
import { LoginPermissionsService } from './guards/login.guard';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [ReactiveFormsModule, SharedModule, AuthRoutingModule],
    providers: [AuthPermissionsService, LoginPermissionsService],
})
export class AuthModule {}
