import { NgModule } from '@angular/core';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteResultsComponent } from './components/favorite-results/favorite-results.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [FavoritePageComponent, FavoriteResultsComponent],
    imports: [FavoriteRoutingModule, SharedModule],
})
export class FavoriteModule {}
