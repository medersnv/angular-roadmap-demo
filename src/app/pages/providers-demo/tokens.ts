import { InjectionToken } from '@angular/core';

export interface AppConfig {
  theme: 'light' | 'dark';
  debug: boolean;
}

export interface DemoPlugin {
  name: string;
}

export interface Logger {
  log(message: string): string;
}

export const API_URL = new InjectionToken<string>('API_URL');
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
export const LOGGER = new InjectionToken<Logger>('LOGGER');
export const LOGGER_ALIAS = new InjectionToken<Logger>('LOGGER_ALIAS');
export const APP_VERSION = new InjectionToken<string>('APP_VERSION');
export const PLUGINS = new InjectionToken<DemoPlugin[]>('PLUGINS');

export class ConsoleLogger implements Logger {
  log(message: string): string {
    return `[Console] ${message}`;
  }
}

export class FileLogger implements Logger {
  log(message: string): string {
    return `[File] ${message}`;
  }
}
