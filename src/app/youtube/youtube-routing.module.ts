import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedInformationPageComponent } from './pages/detailed-information-page/detailed-information-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: ':id',
        component: DetailedInformationPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class YoutubeRoutingModule {}
