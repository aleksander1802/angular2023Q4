import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CustomButtonComponent } from './shared/components/custom-button/custom-button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from './shared/modules/material/material.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchResultsComponent,
        SearchItemComponent,
        MainLayoutComponent,
        CustomButtonComponent,
        HomePageComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, MaterialModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
