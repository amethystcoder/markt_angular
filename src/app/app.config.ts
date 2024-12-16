import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'
import { NetworkAwarePreloadStrategy } from "../app/services/networkPreloader.service";

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withPreloading(NetworkAwarePreloadStrategy)),
    provideHttpClient()
  ]
};
