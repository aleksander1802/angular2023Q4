import { Component } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';

@Component({
    selector: 'app-logo',
    standalone: true,
    imports: [AppRoutingModule],
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {}
