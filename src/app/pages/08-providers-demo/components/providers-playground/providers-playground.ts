import { Component, inject } from '@angular/core';
import {
  API_URL,
  APP_CONFIG,
  APP_VERSION,
  ConsoleLogger,
  LOGGER,
  LOGGER_ALIAS,
  PLUGINS,
} from '../../tokens';

@Component({
  selector: 'app-providers-playground',
  providers: [
    { provide: API_URL, useValue: 'https://api.demo.local' },
    { provide: APP_CONFIG, useValue: { theme: 'dark', debug: true } as const },
    { provide: LOGGER, useClass: ConsoleLogger },
    { provide: LOGGER_ALIAS, useExisting: LOGGER },
    { provide: APP_VERSION, useFactory: () => `1.0.${Date.now() % 10000}` },
    { provide: PLUGINS, useValue: { name: 'Analytics' }, multi: true },
    { provide: PLUGINS, useValue: { name: 'AuditLog' }, multi: true },
    { provide: PLUGINS, useValue: { name: 'FeatureFlags' }, multi: true },
  ],
  templateUrl: './providers-playground.html',
  styleUrl: './providers-playground.scss',
})
export class ProvidersPlayground {
  protected readonly apiUrl = inject(API_URL);
  protected readonly config = inject(APP_CONFIG);
  protected readonly logger = inject(LOGGER);
  protected readonly loggerAlias = inject(LOGGER_ALIAS);
  protected readonly version = inject(APP_VERSION);
  protected readonly plugins = inject(PLUGINS);

  protected logResult = '—';
  protected sameInstance = false;

  testLogger(): void {
    this.logResult = this.logger.log('Hello DI');
    this.sameInstance = this.logger === this.loggerAlias;
  }
}
