import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { DetailedInformationPageComponent } from './pages/detailed-information-page/detailed-information-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
    declarations: [
        SearchResultsComponent,

        HomePageComponent,
        DetailedInformationPageComponent,
        PaginationComponent,
    ],

    imports: [SharedModule, YoutubeRoutingModule],
})
export class YoutubeModule {}
