import { CanActivateFn } from "@angular/router";

export const slowAuthGuard: CanActivateFn = (route, state) => {
  
  console.log(`[SLOW AUTH GUARD]: Starting authentication check for route, takes 2 seconds:`, route);
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};