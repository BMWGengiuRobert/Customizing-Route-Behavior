import { Routes } from '@angular/router';
import { Home } from './features/preloading-strategy/home/home';
import { isbnMatcher } from './core/routing/isbn.matcher';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { slowAuthGuard } from './core/guards/slow-auth.guard';

export const routes: Routes = [
    { path: 'home', component: Home }, // eager load
    {
        path: 'dashboard',
        //matcher: isbnMatcher,       // if matcher fails, error in console, no redirect, no component loaded.
        loadComponent: () => import('./features/preloading-strategy/dashboard/dashboard').then(c => c.Dashboard),
        data: { preload: true }       // background load
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/preloading-strategy/admin/admin').then(c => c.Admin),
        data: { preload: false }      // no load until the link is clicked
    },
    {
        matcher: isbnMatcher,         // no path, but a custom matcher function which acts as a path
        //path: 'book/:isbnId',       // choose between path or matcher, but not both. if both, error in console, app crashes
        loadComponent: () => import('./features/custom-route-matcher/book/book').then(c => c.Book),
        data: { preload: false }      // no load until the link is clicked
    },
    {
        path: 'search',
        loadComponent: () => import('./features/route-reuse/search/search').then(c => c.Search),
        data: {
            preload: false,
            reuse: true               // put this route in the freezer when we navigate away, and reuse it when we navigate back
        }
    },
    {
        path: 'edit-profile',
        loadComponent: () => import('./features/canceled-navigations/profile/profile').then(c => c.Profile),
        canDeactivate: [unsavedChangesGuard],
        data: { preload: true }      // background load
    },
    {
        path: 'secure-area',
        loadComponent: () => import('./features/url-updates/secure-area/secure-area').then(c => c.SecureArea),
        canActivate: [slowAuthGuard],
        data: { preload: true }      // background load
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
