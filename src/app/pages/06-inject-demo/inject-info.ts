export interface InjectExampleInfo {
  id: 'constructor' | 'inject-field' | 'functional';
  title: string;
  description: string;
  hint: string;
  code: string;
}

export const INJECT_ESSENTIALS = [
  'inject(token) — современный способ получить зависимость в Angular 14+.',
  'Работает в конструкторе класса, полях, factory, functional guards/interceptors.',
  'Constructor DI по-прежнему валиден — inject() короче и удобнее в функциях.',
  'inject() можно вызывать только в injection context (конструктор, поле, factory, runInInjectionContext).',
];

export const INJECT_COMPARISON = [
  {
    way: 'constructor(private svc: Svc)',
    note: 'Классический стиль, явные параметры конструктора',
  },
  {
    way: 'private svc = inject(Svc)',
    note: 'Поле класса — современный стандарт для компонентов и сервисов',
  },
  {
    way: 'export fn = () => inject(Svc)',
    note: 'Functional guards, interceptors, resolvers без класса',
  },
];

export const INJECT_EXAMPLES: InjectExampleInfo[] = [
  {
    id: 'constructor',
    title: '1. Constructor injection',
    description: 'Зависимость через параметр конструктора — классический Angular-стиль.',
    hint: 'Клик — сервис возвращает метку времени. Тот же ClockService, что и справа.',
    code: `constructor(private readonly clock: ClockService) {}

onClick(): void {
  this.time = this.clock.now();
}`,
  },
  {
    id: 'inject-field',
    title: '2. inject() в поле класса',
    description: 'Тот же сервис через inject() — меньше boilerplate, удобнее для наследования.',
    hint: 'Поведение идентично constructor — один singleton ClockService.',
    code: `private readonly clock = inject(ClockService);

onClick(): void {
  this.time = this.clock.now();
}`,
  },
  {
    id: 'functional',
    title: '3. inject() в функции (functional DI)',
    description: 'Functional guard / interceptor — inject() внутри функции в injection context.',
    hint: 'Нажми «Запустить guard» — функция authGuard() вызовет inject(AuthService).',
    code: `export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
};`,
  },
];
