import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { SelectivePreloadStrategy } from './core/routing/selective-preload.strategy';
import { CustomRouteReuseStrategy } from './core/routing/route-reuse.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(SelectivePreloadStrategy),
      withComponentInputBinding()
    ),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ]
};
