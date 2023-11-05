import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { MaterialModule } from '../material/material.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
    declarations: [CustomButtonComponent, MainLayoutComponent],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [CustomButtonComponent, MaterialModule, CommonModule],
})
export class SharedModule {}
