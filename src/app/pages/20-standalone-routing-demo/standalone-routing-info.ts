export interface CompareMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export interface RouterFeature {
  id: string;
  call: string;
  label: string;
  desc: string;
  /** Как эта же опция выглядела в объекте forRoot */
  legacyFlag: string;
}

export const PROVIDE_ROUTER_ESSENTIALS = [
  'provideRouter(routes, ...features) заменяет RouterModule.forRoot() в bootstrapApplication.',
  'Раньше все опции собирались в один объект — теперь каждая опция это отдельная with*-функция.',
  'Не подключил with*-функцию — её код вообще не попадёт в бандл (tree-shaking работает точечно).',
  'withComponentInputBinding() пробрасывает params/query/data роута прямо в @Input компонента.',
];

export const PROVIDE_ROUTER_MOMENTS: CompareMoment[] = [
  {
    id: 'forroot',
    title: '1. forRoot() → provideRouter()',
    desc: 'Раньше роутер настраивали через RouterModule.forRoot() в AppModule. Теперь — функцией provideRouter() в providers конфигурации приложения.',
    beforeCode: `@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      bindToComponentInputs: true,
    }),
  ],
})
export class AppModule {}`,
    afterCode: `export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
    ),
  ],
};`,
    note: 'Каждая опция forRoot превратилась в отдельную with*-функцию: конфиг стал композицией, а не объектом флагов.',
  },
  {
    id: 'inputs',
    title: '2. withComponentInputBinding(): params → @Input',
    desc: 'Раньше параметры роута читали из ActivatedRoute и подписки. С этой фичей значения из path/query/data прилетают прямо во входы компонента — никакой ручной подписки.',
    beforeCode: `// Раньше: достаём id из ActivatedRoute вручную
export class UserPage {
  private route = inject(ActivatedRoute);
  id = '';

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.id = p.get('id')!;
    });
  }
}`,
    afterCode: `// withComponentInputBinding() включён в appConfig —
// и всё. Имя input == имя параметра роута:
export class UserPage {
  readonly id = input.required<string>();
  // :id меняется → input обновляется сам
}`,
    note: 'Работает для path-параметров, query-параметров и data роута. Имя input должно совпадать с именем параметра.',
  },
  {
    id: 'preload',
    title: '3. withPreloading(): умная догрузка',
    desc: 'Lazy-чанки можно догружать заранее, чтобы переход был мгновенным. PreloadAllModules грузит всё в фоне; для тонкой настройки пишут свою стратегию.',
    beforeCode: `RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
});`,
    afterCode: `provideRouter(
  routes,
  withPreloading(PreloadAllModules),
  // или своя стратегия с data-флагом
);`,
    note: 'Стартовый бандл остаётся маленьким (lazy), но к моменту перехода чанк уже в кэше — лучший UX без потери TTI.',
  },
];

/** Возможности роутера для интерактивного конструктора. */
export const ROUTER_FEATURES: RouterFeature[] = [
  {
    id: 'inputs',
    call: 'withComponentInputBinding()',
    label: 'Component input binding',
    desc: 'params/query/data роута → прямо в @Input компонента.',
    legacyFlag: 'bindToComponentInputs: true',
  },
  {
    id: 'preload',
    call: 'withPreloading(PreloadAllModules)',
    label: 'Preloading',
    desc: 'Фоновая догрузка lazy-чанков после старта.',
    legacyFlag: 'preloadingStrategy: PreloadAllModules',
  },
  {
    id: 'scroll',
    call: "withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })",
    label: 'Scroll restoration',
    desc: 'Восстановление позиции скролла при переходах.',
    legacyFlag: "scrollPositionRestoration: 'enabled'",
  },
  {
    id: 'transitions',
    call: 'withViewTransitions()',
    label: 'View transitions',
    desc: 'Плавные анимации переходов (View Transitions API).',
    legacyFlag: '— не было (появилось в Angular 17)',
  },
  {
    id: 'hash',
    call: 'withHashLocation()',
    label: 'Hash location',
    desc: 'URL вида /#/path — для серверов без History API.',
    legacyFlag: 'useHash: true',
  },
  {
    id: 'debug',
    call: 'withDebugTracing()',
    label: 'Debug tracing',
    desc: 'Логирует каждое событие навигации в консоль.',
    legacyFlag: 'enableTracing: true',
  },
];
