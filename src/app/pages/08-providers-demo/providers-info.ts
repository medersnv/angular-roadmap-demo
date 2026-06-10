export interface ProviderTypeInfo {
  type: string;
  summary: string;
}

export const PROVIDERS_ESSENTIALS = [
  'Provider говорит Angular: «когда просят TOKEN — верни вот это».',
  'useClass — создать экземпляр класса. useExisting — алиас на другой token.',
  'useFactory — создать через функцию (конфиг, env, compose). useValue — готовое значение.',
  'InjectionToken — типобезопасный ключ для строк/объектов. multi: true — массив провайдеров.',
];

export const PROVIDER_TYPES: ProviderTypeInfo[] = [
  { type: 'useClass', summary: 'new MyService() — подмена реализации (MockLogger → ConsoleLogger)' },
  { type: 'useExisting', summary: 'тот же экземпляр, другой token — алиас для DI' },
  { type: 'useFactory', summary: 'deps + factory fn — динамическое создание' },
  { type: 'useValue', summary: 'константа, конфиг, mock-объект' },
  { type: 'InjectionToken', summary: 'ключ для примитивов и интерфейсов без класса' },
  { type: 'multi: true', summary: 'несколько провайдеров на один token → массив (plugins, interceptors)' },
];

export const PROVIDERS_SETUP_CODE = `@Component({
  providers: [
    { provide: API_URL, useValue: 'https://api.demo.local' },
    { provide: LOGGER, useClass: ConsoleLogger },
    { provide: LOGGER_ALIAS, useExisting: LOGGER },
    { provide: APP_VERSION, useFactory: () => '1.0.' + Date.now() },
    { provide: PLUGINS, useValue: { name: 'Analytics' }, multi: true },
    { provide: PLUGINS, useValue: { name: 'Audit' }, multi: true },
  ],
})`;
