import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // --- Change Detection: оставь один provider, второй закомментируй ---
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),

    provideRouter(routes),
  ],
};
