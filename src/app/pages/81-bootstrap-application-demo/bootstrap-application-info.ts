export interface CompareMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export interface MigrationRow {
  id: string;
  legacy: string;
  modern: string;
  note: string;
}

export const BOOTSTRAP_ESSENTIALS = [
  'Точка входа теперь bootstrapApplication(Root, appConfig) — без корневого AppModule.',
  'Всё, что лежало в imports AppModule, переехало в providers как provide-функции.',
  'provide-функции tree-shakeable: не подключил provideAnimations() — код анимаций не попал в бандл.',
  'FormsModule/ReactiveFormsModule и подобные импортируются прямо в standalone-компоненты, где нужны.',
];

export const BOOTSTRAP_MOMENTS: CompareMoment[] = [
  {
    id: 'entry',
    title: '1. Точка входа: bootstrapModule → bootstrapApplication',
    desc: 'Раньше платформа поднимала корневой модуль, а тот — корневой компонент. Теперь корневой компонент поднимается напрямую, а конфигурация передаётся объектом.',
    beforeCode: `// main.ts — раньше
import { platformBrowserDynamic }
  from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));`,
    afterCode: `// main.ts — сейчас
import { bootstrapApplication }
  from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));`,
  },
  {
    id: 'config',
    title: '2. AppModule → ApplicationConfig',
    desc: 'Метаданные модуля превратились в плоский объект providers. Никаких declarations (компоненты самодостаточны) и bootstrap-массива.',
    beforeCode: `@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`,
    afterCode: `// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
  ],
};`,
    note: 'BrowserModule не нужен — браузерная платформа уже в bootstrapApplication. declarations исчезли: standalone-компоненты объявляют зависимости сами.',
  },
];

/** Данные для интерактива «что куда переехало». */
export const MIGRATION_ROWS: MigrationRow[] = [
  {
    id: 'http',
    legacy: 'HttpClientModule',
    modern: 'provideHttpClient(withInterceptors([authInterceptor]))',
    note: 'Интерсепторы теперь функции, а не классы: withInterceptors([...]).',
  },
  {
    id: 'router',
    legacy: 'RouterModule.forRoot(routes)',
    modern: 'provideRouter(routes, withComponentInputBinding())',
    note: 'Фичи роутера подключаются опциональными with*-функциями.',
  },
  {
    id: 'anim',
    legacy: 'BrowserAnimationsModule',
    modern: 'provideAnimationsAsync()',
    note: 'Async-вариант грузит движок анимаций лениво — меньше стартовый бандл.',
  },
  {
    id: 'forms',
    legacy: 'ReactiveFormsModule',
    modern: '— импортируется в компонент',
    note: 'Формы нужны не глобально, а в конкретном компоненте: imports: [ReactiveFormsModule].',
  },
  {
    id: 'browser',
    legacy: 'BrowserModule',
    modern: '— не нужен',
    note: 'Браузерная платформа уже встроена в bootstrapApplication.',
  },
  {
    id: 'sw',
    legacy: "ServiceWorkerModule.register('ngsw.js')",
    modern: "provideServiceWorker('ngsw-worker.js')",
    note: 'PWA подключается одной provide-функцией с теми же опциями.',
  },
];
