import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [CustomButtonComponent],
    imports: [CommonModule, MaterialModule],
    exports: [CustomButtonComponent, MaterialModule],
})
export class SharedModule {}
