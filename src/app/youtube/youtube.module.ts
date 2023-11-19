import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { DetailedInformationPageComponent } from './pages/detailed-information-page/detailed-information-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
    declarations: [
        SearchResultsComponent,
        SearchItemComponent,
        HomePageComponent,
        DetailedInformationPageComponent,
    ],

    imports: [SharedModule, YoutubeRoutingModule],
})
export class YoutubeModule {}
