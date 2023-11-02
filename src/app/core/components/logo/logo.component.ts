import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
    selector: 'app-logo',
    standalone: true,
    imports: [CommonModule, AppRoutingModule],
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {}
