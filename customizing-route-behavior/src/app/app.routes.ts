import { Routes } from '@angular/router';
import { Home } from './features/preloading-strategy/home/home';
import { isbnMatcher } from './core/routing/isbn.matcher';

export const routes: Routes = [
    { path: 'home', component: Home }, // eager load
    {
        path: 'dashboard',
        loadComponent: () => import('./features/preloading-strategy/dashboard/dashboard').then(c => c.Dashboard),
        data: { preload: true }       // background load
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/preloading-strategy/admin/admin').then(c => c.Admin),
        data: { preload: false }      // no load until the link is clicked
    },
    {
        matcher: isbnMatcher,        // no path, but a custom matcher function which acts as a path
        loadComponent: () => import('./features/custom-route-matcher/book/book').then(c => c.Book),
        //data: { preload: true }     // no load until the link is clicked
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
