import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        AuthRoutingModule,
    ],
})
export class AuthModule {}
