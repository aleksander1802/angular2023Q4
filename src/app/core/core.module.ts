import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginInformationBlockComponent } from './components/login-information-block/login-information-block.component';
import { HeaderSearchBlockComponent } from './components/header-search-block/header-search-block.component';
import { FilteringCriteriaBlockComponent } from './components/filtering-criteria-block/filtering-criteria-block.component';
import { LogoComponent } from './components/logo/logo.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
    declarations: [
        HeaderComponent,
        LoginInformationBlockComponent,
        HeaderSearchBlockComponent,
        FilteringCriteriaBlockComponent,
        NotFoundComponent,
    ],
    imports: [CommonModule, SharedModule, LogoComponent],
    exports: [HeaderComponent],
})
export class CoreModule {}
