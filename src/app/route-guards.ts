import { Injectable, inject } from '@angular/core';
import { UserstateService } from "./userstate.service";
import { 
        ActivatedRouteSnapshot, 
        CanActivateFn, 
        CanActivateChildFn, 
        RouterStateSnapshot, 
        CanMatchFn, 
        Route, Router, UrlSegment } from '@angular/router';

        

export const LoginGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
        return true
}

import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class VillainsComponent implements CanComponentDeactivate { ...
//
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const NaeGuard: CanDeactivateFn<CanComponentDeactivate> = (
    component: CanComponentDeactivate
) => {
        if (component.canDeactivate()) {
            console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - allowed`);
            return true;
        } else {
            console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - not allowed`);
            return false;
    }
}

export const NamGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    return true;
}
