export interface LeakMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
  /** true → под кодом рендерится живой стенд. */
  live?: boolean;
}

export const LEAK_ESSENTIALS = [
  'Observable холодный и ленивый: пока не подписался — ничего не происходит; подписался — обязан отписаться.',
  'Конечные потоки (HttpClient, forkJoin) сами шлют complete и закрываются. Бесконечные (interval, fromEvent, Subject) — нет.',
  'AsyncPipe подписывается и отписывается сам вместе с шаблоном — предпочитайте его ручному subscribe.',
  'В TypeScript отписку привязывают к жизни компонента: takeUntilDestroyed() (v16+) вместо ручного ngOnDestroy.',
];

export const LEAK_MOMENTS: LeakMoment[] = [
  {
    id: 'leak-lab',
    title: '1. Анатомия утечки: подписка переживает компонент',
    desc: 'interval() — бесконечный поток. Если подписку не закрыть, она живёт после уничтожения компонента: таймер тикает, замыкание держит ссылки, память не освобождается. Смонтируйте и размонтируйте оба тикера и сравните поведение счётчиков.',
    beforeCode: `// Утечка: подписку никто не закроет
export class LeakyTicker {
  constructor() {
    interval(700).subscribe(() => this.tick());
    // нет ngOnDestroy / takeUntilDestroyed
  }
}
// после уничтожения таймер всё ещё тикает`,
    afterCode: `// Безопасно: время жизни = жизнь компонента
export class SafeTicker {
  constructor() {
    interval(700)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.tick());
  }
}
// уничтожили компонент → поток завершился`,
    note: 'Счётчики лежат в root-сервисе, поэтому утечку видно даже после навигации: уйдите со страницы и вернитесь — leaky-число выросло (interval жив), а safe замёрзло (takeUntilDestroyed закрыл поток при уничтожении). В реальном приложении так копятся таймеры, слушатели DOM и WebSocket-обработчики.',
    live: true,
  },
  {
    id: 'manual',
    title: '2. Классика до v16: Subject destroy$ + takeUntil',
    desc: 'Исторический паттерн ручной отписки: завести Subject, эмитить в ngOnDestroy и глушить им все потоки через takeUntil. Работает, но это шаблонный boilerplate, который легко забыть в одном из subscribe.',
    beforeCode: `// Совсем плохо: храним Subscription руками
sub = new Subscription();
ngOnInit() {
  this.sub.add(this.a$.subscribe());
  this.sub.add(this.b$.subscribe());
}
ngOnDestroy() { this.sub.unsubscribe(); }`,
    afterCode: `// Лучше (до v16): один destroy$ на компонент
private destroy$ = new Subject<void>();
ngOnInit() {
  this.a$.pipe(takeUntil(this.destroy$)).subscribe();
  this.b$.pipe(takeUntil(this.destroy$)).subscribe();
}
ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }`,
    note: 'takeUntil ставят ПОСЛЕДНИМ в pipe — иначе операторы ниже могут пересоздать подписку и обойти отписку. С v16 этот паттерн заменяет takeUntilDestroyed().',
  },
  {
    id: 'async-pipe',
    title: '3. Лучший способ — не подписываться вручную: AsyncPipe',
    desc: 'Если поток нужен только для отображения — отдайте его в шаблон через AsyncPipe. Он сам подпишется при создании view и отпишется при уничтожении. Нет subscribe — нечего забыть закрыть.',
    beforeCode: `// Ручная подписка ради рендера — лишний риск
data: Data | null = null;
ngOnInit() {
  this.api.data$.subscribe(d => this.data = d);
}
ngOnDestroy() { /* не забыть отписаться */ }`,
    afterCode: `// Декларативно: поток как поле, подписка в шаблоне
protected readonly data$ = this.api.data$;
// template:
// @if (data$ | async; as data) { {{ data.title }} }`,
    note: 'AsyncPipe ещё и триггерит OnPush-обновление при каждой эмиссии. Для нескольких чтений одного потока используйте «@if (x$ | async; as x)» или @let, чтобы не плодить подписки.',
  },
  {
    id: 'share-replay',
    title: '4. Скрытая утечка: shareReplay без refCount',
    desc: 'shareReplay кэширует ответ и раздаёт его подписчикам — отлично против дублей HTTP. Но «голый» shareReplay(1) держит подписку на источник вечно, даже когда слушателей не осталось. Для бесконечных источников это утечка.',
    beforeCode: `// Утечка: источник не отпускается,
// когда подписчиков не осталось
data$ = this.http.get('/api').pipe(
  shareReplay(1),
);`,
    afterCode: `// Безопасно: refCount отключает источник,
// когда подписчиков 0 (и снова включит при новом)
data$ = this.http.get('/api').pipe(
  shareReplay({ bufferSize: 1, refCount: true }),
);`,
    note: 'Для конечного HTTP-запроса разница мала (поток завершится сам). Для бесконечного (WebSocket, interval) refCount: true обязателен, иначе источник живёт после ухода всех подписчиков.',
  },
];
