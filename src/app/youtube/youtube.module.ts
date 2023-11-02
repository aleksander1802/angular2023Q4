import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { SortingPipe } from './pipes/sorting/sorting.pipe';
import { FilteringPipe } from './pipes/filtering/filtering.pipe';
import { ColorByDateDirective } from './directives/colorByDate/color-by-date.directive';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { MetricsComponent } from './components/metrics/metrics.component';
import { DetailedInformationPageComponent } from './pages/detailed-information-page/detailed-information-page.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        SearchResultsComponent,
        SearchItemComponent,
        SortingPipe,
        FilteringPipe,
        ColorByDateDirective,
        HomePageComponent,
        MetricsComponent,
        DetailedInformationPageComponent,
    ],
    imports: [CommonModule, SharedModule, AppRoutingModule],
})
export class YoutubeModule {}
