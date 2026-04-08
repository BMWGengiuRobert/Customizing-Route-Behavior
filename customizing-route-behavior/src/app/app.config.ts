import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding, withPreloading, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { SelectivePreloadStrategy } from './core/routing/selective-preload.strategy';
import { CustomRouteReuseStrategy } from './core/routing/route-reuse.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(SelectivePreloadStrategy),
      withComponentInputBinding(),

      // broke history stack, use 'replace', maintain history stack, use 'computed'
      withRouterConfig({ canceledNavigationResolution: 'computed', 
        // url changes when time expires, use 'deferred', url updates immediately when navigation starts, use 'eager'
        urlUpdateStrategy: 'deferred' }
      )
    ),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ]
};
