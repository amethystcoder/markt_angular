import { Injectable, inject } from '@angular/core';
import { UserstateService } from "./userstate.service";
import { ActivatedRouteSnapshot, 
    CanActivateFn, 
    CanActivateChildFn, 
    RouterStateSnapshot, 
    CanMatchFn, 
    Route, Router, UrlSegment,CanDeactivateFn  } from '@angular/router';
import { user_id_sub, user_name_sub, user_type_sub } from "./userstate.service";
        

export const LoginGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
        let userId,userName,userType
        user_id_sub.subscribe(id=>userId = (typeof id != "undefined" && id != ""))
        user_name_sub.subscribe(name=>userName = (typeof name != "undefined" && name != ""))
        user_type_sub.subscribe(type=>userType = (typeof type != "undefined" && type != ""))
        if (!userId || !userName || !userType) {
            new Router().navigate(["userauth"])
            return false
        } 
        return userId && userName && userType
}
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
