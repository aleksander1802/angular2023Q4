import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { MaterialModule } from '../material/material.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ColorByDateDirective } from './directives/colorByDate/color-by-date.directive';
import { FilteringPipe } from './pipes/filtering/filtering.pipe';
import { SortingPipe } from './pipes/sorting/sorting.pipe';
import { MetricsComponent } from './components/metrics/metrics.component';
import { CyberButtonComponent } from './components/cyber-button/cyber-button.component';
import { SearchItemComponent } from './components/search-item/search-item.component';

@NgModule({
    declarations: [
        CustomButtonComponent,
        MainLayoutComponent,
        MetricsComponent,
        SortingPipe,
        FilteringPipe,
        ColorByDateDirective,
        CyberButtonComponent,
        SearchItemComponent,
    ],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [
        CommonModule,
        MaterialModule,
        CustomButtonComponent,
        MetricsComponent,
        SortingPipe,
        FilteringPipe,
        ColorByDateDirective,
        CyberButtonComponent,
        SearchItemComponent,
    ],
})
export class SharedModule {}
