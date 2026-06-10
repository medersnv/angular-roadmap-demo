export interface ZoneApiInfo {
  method: string;
  summary: string;
}

export interface ZoneExampleInfo {
  id: 'inside-zone' | 'outside-zone' | 'zone-run';
  title: string;
  description: string;
  hint: string;
  useCases?: string[];
  code: string;
}

export const ZONE_ESSENTIALS = [
  'Zone.js патчит асинхронные API браузера: setTimeout, Promise, addEventListener, XHR и др.',
  'После завершения async-callback Zone сообщает Angular: «запусти change detection».',
  'NgZone.runOutsideAngular() — код выполняется без уведомления Angular (оптимизация, интеграции).',
  'NgZone.run() — вернуть callback в Zone и снова запустить CD.',
];

export const ZONE_API: ZoneApiInfo[] = [
  {
    method: 'NgZone.run()',
    summary: 'Выполнить функцию внутри Zone. Angular узнает об изменениях и запустит CD.',
  },
  {
    method: 'NgZone.runOutsideAngular()',
    summary: 'Выполнить код вне Zone. Angular не получит сигнал об async-завершении.',
  },
  {
    method: 'NgZone.onStable',
    summary: 'Observable: эмитит, когда нет макрозадач в Zone (удобно для e2e, анимаций).',
  },
  {
    method: 'NgZone.isStable',
    summary: 'Флаг: приложение «успокоилось» — нет pending async в Zone.',
  },
];

export const ZONE_BOOTSTRAP_CODE = `// app.config.ts — раскомментируй один provider
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};`;

export const ZONE_EXAMPLES: ZoneExampleInfo[] = [
  {
    id: 'inside-zone',
    title: '1. setTimeout внутри Zone',
    description: 'Обычный setInterval — Zone.js его перехватывает, CD запускается автоматически.',
    hint: 'Счётчик растёт каждую секунду без ручных вызовов ChangeDetectorRef.',
    useCases: [
      'Любой async-код внутри Angular по умолчанию (HTTP через HttpClient, клики, таймеры)',
      'subscribe() в компоненте — Zone видит завершение microtask',
      'Не нужно думать о CD для большинства повседневных задач',
    ],
    code: `// Zone.js патчит setInterval → после callback Angular запускает CD
ngOnInit(): void {
  setInterval(() => {
    this.count++;
  }, 1000);
}`,
  },
  {
    id: 'outside-zone',
    title: '2. runOutsideAngular()',
    description:
      'Код вне Zone: данные меняются, но Angular не знает — UI «застывает» до следующего события в Zone.',
    hint: 'Нажми кнопку — увидишь «Жду…», через 1 сек данные в памяти другие, но UI не обновится.',
    useCases: [
      'Тяжёлые вычисления или polling — не будить Angular каждый тик',
      'Интеграция с библиотекой, которая часто вызывает callback',
      'game loop, canvas, requestAnimationFrame вне Angular',
    ],
    code: `this.ngZone.runOutsideAngular(() => {
  setTimeout(() => {
    this.text = 'Готово'; // в памяти изменилось
    // UI не обновится — Angular не получил сигнал из Zone
  }, 1000);
});`,
  },
  {
    id: 'zone-run',
    title: '3. NgZone.run() — вернуть в Zone',
    description: 'После async вне Zone вызываем NgZone.run() — Angular снова запускает CD.',
    hint: 'Сначала «вне Zone», затем нажми «NgZone.run()» — UI подхватит новое значение.',
    useCases: [
      'Завершение async в runOutsideAngular — вернуть обновление UI',
      'Callback сторонней библиотеки: обернуть изменение состояния в NgZone.run()',
      'Альтернатива markForCheck() для Default-компонентов',
    ],
    code: `this.ngZone.runOutsideAngular(() => {
  setTimeout(() => {
    this.ngZone.run(() => {
      this.text = 'Готово'; // Zone уведомит Angular → CD → UI обновится
    });
  }, 1000);
});`,
  },
];
