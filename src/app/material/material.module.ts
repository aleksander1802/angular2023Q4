import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class MaterialModule {}
