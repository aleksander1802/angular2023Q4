import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, MainLayoutComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, CoreModule],
})
export class AppModule {}
