import { Injectable, inject } from '@angular/core';
import { UserstateService } from "./userstate.service";
import { ActivatedRouteSnapshot, 
    CanActivateFn, 
    CanActivateChildFn, 
    RouterStateSnapshot, 
    CanMatchFn, 
    Route, Router, UrlSegment,CanDeactivateFn  } from '@angular/router';
import { signalstore } from "./userstate.service";
import { Observable, single } from 'rxjs';


export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class routeGuards {
    LoginGuard: CanActivateFn = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ) => {
            let signal = inject(signalstore)
            if (!signal.user_id() || !signal.name() || !signal.user_type()) {
                new Router().navigate(["userauth"])
                return false
            } 
            return true
    }
    
    canLeaveSignup: CanDeactivateFn<CanComponentDeactivate> = (
        component: CanComponentDeactivate
    ) => {
            if (component.canDeactivate()) {
                console.log(`💂‍♀️ Can Deactivate Guard - allowed`);
                return true;
            } else {
                console.log(`💂‍♀️ Can Deactivate Guard - not allowed`);
                return false;
        }
    }
    
    usermatch: CanMatchFn = (route: Route,segments: UrlSegment[]) => {
        let signal = inject(signalstore)
        return signal.user_type().toLowerCase() == "buyer";
    }
    
}
