import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { AdminPageComponent } from './core/pages/admin-page/admin-page.component';
import { FavoritePageComponent } from './favorite/pages/favorite-page/favorite-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
                canActivate: [LoginGuard],
            },
            {
                path: 'youtube',
                loadChildren: () => import('./youtube/youtube.module').then(
                    (m) => m.YoutubeModule
                ),
                canActivate: [AuthGuard],
            },
            {
                path: 'admin',
                component: AdminPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'favorite',
                component: FavoritePageComponent,
                canActivate: [AuthGuard],
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
