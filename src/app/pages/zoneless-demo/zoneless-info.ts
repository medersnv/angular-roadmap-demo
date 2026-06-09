export interface ZonelessTriggerInfo {
  trigger: string;
  works: boolean;
  summary: string;
}

export interface ZonelessExampleInfo {
  id: 'signal' | 'async-pipe' | 'no-trigger' | 'mark-for-check';
  title: string;
  description: string;
  hint: string;
  code: string;
}

export const ZONELESS_ESSENTIALS = [
  'Zoneless — Angular без zone.js: CD не запускается «сам» после каждого setTimeout или Promise.',
  'Обновление UI только через явные триггеры: signal, async pipe, событие шаблона, ChangeDetectorRef.',
  'provideZonelessChangeDetection() — включает режим в app.config.ts (закомментируй Zone.js provider).',
  'Async вне триггеров имитируем через runOutsideAngular — поведение такое же, как в zoneless.',
];

export const ZONELESS_BOOTSTRAP_CODE = `// app.config.ts — раскомментируй один provider
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};`;

export const ZONELESS_TRIGGERS: ZonelessTriggerInfo[] = [
  {
    trigger: 'Событие в шаблоне (click, input)',
    works: true,
    summary: 'Angular знает источник — проверяет компонент.',
  },
  {
    trigger: 'signal / input() / computed',
    works: true,
    summary: 'Angular отслеживает reactive graph и обновляет view.',
  },
  {
    trigger: 'async pipe',
    works: true,
    summary: 'Pipe помечает компонент при новой эмиссии Observable.',
  },
  {
    trigger: 'markForCheck() / detectChanges()',
    works: true,
    summary: 'Ручной триггер для OnPush и внешних callback.',
  },
  {
    trigger: 'setTimeout / subscribe без async pipe',
    works: false,
    summary: 'Без Zone некому сообщить Angular — UI не обновится сам.',
  },
];

export const ZONELESS_EXAMPLES: ZonelessExampleInfo[] = [
  {
    id: 'signal',
    title: '1. signal — работает в zoneless',
    description: 'setInterval обновляет signal — Angular перерисовывает view без Zone.js.',
    hint: 'Счётчик растёт каждую секунду. signal — рекомендуемый способ в zoneless.',
    code: `count = signal(0);

ngOnInit(): void {
  setInterval(() => {
    this.count.update((v) => v + 1);
  }, 1000);
}`,
  },
  {
    id: 'async-pipe',
    title: '2. async pipe — работает в zoneless',
    description: 'Observable + | async в шаблоне — Angular подписывается и обновляет UI при эмиссии.',
    hint: 'Нажми «Следующее» — сообщение меняется, async pipe запускает проверку.',
    code: `message$ = new BehaviorSubject('Привет');

next(): void {
  this.message$.next('Новое значение');
}

// шаблон: {{ message$ | async }}`,
  },
  {
    id: 'no-trigger',
    title: '3. Обычное поле + setTimeout — не работает',
    description:
      'Имитация zoneless: runOutsideAngular + изменение поля — UI не обновится без явного триггера.',
    hint: 'После таймера значение в памяти другое, но на экране старое. Нужен signal или markForCheck().',
    code: `this.ngZone.runOutsideAngular(() => {
  setTimeout(() => {
    this.text = 'Новое'; // в zoneless UI не обновится
  }, 1000);
});`,
  },
  {
    id: 'mark-for-check',
    title: '4. markForCheck() — ручной триггер',
    description: 'После async-callback вызываем markForCheck() — OnPush/default обновится в следующем CD.',
    hint: 'Тот же сценарий, но с markForCheck() внутри callback — UI обновится через 1 сек.',
    code: `this.ngZone.runOutsideAngular(() => {
  setTimeout(() => {
    this.text = 'Новое';
    this.cdr.markForCheck();
  }, 1000);
});`,
  },
];
