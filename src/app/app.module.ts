import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CustomButtonComponent } from './shared/components/custom-button/custom-button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { MetricsComponent } from './components/metrics/metrics.component';
import { ColorByDateDirective } from './shared/directives/color-by-date.directive';
import { FilteringCriteriaBlockComponent } from './components/filtering-criteria-block/filtering-criteria-block.component';
import { SortingPipe } from './shared/pipes/sorting/sorting.pipe';
import { FilteringPipe } from './shared/pipes/filtering/filtering.pipe';
import { LogoComponent } from './shared/components/logo/logo.component';
import { LoginInformationBlockComponent } from './components/login-information-block/login-information-block.component';
import { HeaderSearchBlockComponent } from './components/header-search-block/header-search-block.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchResultsComponent,
        SearchItemComponent,
        MainLayoutComponent,
        CustomButtonComponent,
        HomePageComponent,
        MetricsComponent,
        ColorByDateDirective,
        FilteringCriteriaBlockComponent,
        SortingPipe,
        FilteringPipe,
        LoginInformationBlockComponent,
        HeaderSearchBlockComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        FormsModule,
        LogoComponent,
    ],
})
export class AppModule {}
