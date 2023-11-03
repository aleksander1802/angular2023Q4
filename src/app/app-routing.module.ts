import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
            },
            {
                path: 'youtube',
                loadChildren: () => import('./youtube/youtube.module').then(
                    (m) => m.YoutubeModule
                ),
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
