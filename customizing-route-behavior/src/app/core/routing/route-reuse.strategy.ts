import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy } from "@angular/router";

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {

    private freezer = new Map<Route | null, DetachedRouteHandle>();

    // put in the freezer only if the route ask for it
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log(`[ROUTE REUSE STRATEGY]: shouldDetach called for route:`, route);
        console.log('\n\n-------------------------------------------------------------\n\n');
        return route.data['reuse'] === true;
    }

    // put the frozen component into the freezer, using the route as key
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        console.log(`[ROUTE REUSE STRATEGY]: Storing route in freezer:`, route);
        if (route.data['reuse'] === true) {
            this.freezer.set(route.routeConfig || null, handle);
        }
        console.log(`[ROUTE REUSE STRATEGY]: Current freezer state:`, this.freezer);
        console.log('\n\n-------------------------------------------------------------\n\n');
    }

    // check if we have a frozen component in the freezer for this route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const canAttach = this.freezer.has(route.routeConfig || null);
        console.log(`[ROUTE REUSE STRATEGY]: shouldAttach called for route:`, route);
        console.log(`[ROUTE REUSE STRATEGY]: Can attach from freezer?`, canAttach);
        console.log('\n\n-------------------------------------------------------------\n\n');

        return route.data['reuse'] === true && canAttach;
    }

    // retrieve the frozen component from the freezer for this route
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        console.log(`[ROUTE REUSE STRATEGY]: Retrieving route from freezer:`, route);
        const handle = this.freezer.get(route.routeConfig || null);
        console.log(`[ROUTE REUSE STRATEGY]: Retrieved handle:`, handle);
        console.log('\n\n-------------------------------------------------------------\n\n');

        return route.data['reuse'] === true ? handle || null : null;
    }

    // default reuse strategy: reuse the route if the future route and current route are the same
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}