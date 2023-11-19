import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { LoginInformationBlockComponent } from './components/login-information-block/login-information-block.component';
import { HeaderSearchBlockComponent } from './components/header-search-block/header-search-block.component';
import { FilteringCriteriaBlockComponent } from './components/filtering-criteria-block/filtering-criteria-block.component';
import { LogoComponent } from './components/logo/logo.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
    declarations: [
        HeaderComponent,
        LoginInformationBlockComponent,
        HeaderSearchBlockComponent,
        FilteringCriteriaBlockComponent,
        AdminPageComponent,
    ],
    providers: [httpInterceptorProviders],
    imports: [
        SharedModule,
        LogoComponent,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    exports: [HeaderComponent],
})
export class CoreModule {}
