import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './youtube/pages/home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { DetailedInformationPageComponent } from './youtube/pages/detailed-information-page/detailed-information-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/youtube',
                pathMatch: 'full',
            },
            {
                path: 'youtube',
                component: HomePageComponent,
            },
            {
                path: 'youtube/:id',
                component: DetailedInformationPageComponent,
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
