import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SelectivePreloadStrategy implements PreloadingStrategy {
    preload(route: Route, fn: () => Observable<any>): Observable<any> {

        if (route.data && route.data["preload"] === true) {
            console.log(`[DATA]: Route.data has preload set to true.`, route.data);
            console.log(`[ROUTE]:`, route);
            console.log(`[NETWORK]: Downloading data in background for route: [/${route.path}]`);
            console.log("\n\n-------------------------------------------------------------\n\n");
            return fn();
        }

        return of(null);
    }

}