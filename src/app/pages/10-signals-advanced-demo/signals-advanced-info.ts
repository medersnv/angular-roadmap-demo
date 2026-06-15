import { SignalMoment } from '../09-signals-basics-demo/signals-basics-info';

export type { SignalMoment };

export const SIGNALS_ADVANCED_ESSENTIALS = [
  'linkedSignal() — writable-сигнал, который пересчитывается из источника, но его можно и менять вручную.',
  'Базовая форма linkedSignal(() => source()) — при изменении источника значение сбрасывается.',
  'Форма с computation(source, previous) — можно сохранить прежний выбор, если он ещё валиден.',
  'resource() — асинхронный примитив: сам гоняет loader и отдаёт status / value / error сигналами (experimental).',
];

export const SIGNALS_ADVANCED_MOMENTS: SignalMoment[] = [
  {
    id: 'linked-reset',
    title: '1. Состояние, зависящее от источника: effect-костыль → linkedSignal()',
    desc: 'Нужно writable-состояние, которое сбрасывается при смене источника. Раньше это делали либо ручным сбросом в обработчике, либо effect()-ом, пишущим в signal (анти-паттерн). linkedSignal() делает это декларативно.',
    beforeCode: `// Раньше: writable signal + сброс руками
region = signal<Region>('РФ');
methods = computed(() => METHODS[this.region()]);
selected = signal('Почта');

setRegion(r: Region) {
  this.region.set(r);
  // легко забыть — selected станет невалидным
}`,
    afterCode: `// Сейчас: linkedSignal сбрасывается сам
region = signal<Region>('РФ');
methods = computed(() => METHODS[this.region()]);

// при смене methods → сброс на первый
selected = linkedSignal(() => this.methods()[0]);

setRegion(r: Region) { this.region.set(r); }`,
    note: 'linkedSignal — это WritableSignal: selected.set(...) работает. Но как только меняется источник, значение пересчитывается заново.',
  },
  {
    id: 'linked-prev',
    title: '2. Сохранить выбор, если он ещё валиден: computation(source, previous)',
    desc: 'Список фильтруется, а выбранный элемент хочется сохранить, пока он есть в новом списке. Наивный сброс «на первый» теряет выбор пользователя. Расширенная форма linkedSignal даёт доступ к previous.',
    beforeCode: `// Раньше: при каждом изменении — на первый
filter = signal('');
filtered = computed(() => filterUsers(this.filter()));
selected = signal(USERS[0]);

setFilter(t: string) {
  this.filter.set(t);
  this.selected.set(this.filtered()[0]); // выбор теряется
}`,
    afterCode: `// Сейчас: сохраняем previous, если он валиден
selected = linkedSignal({
  source: this.filtered,
  computation: (list, previous) => {
    const prev = previous?.value;
    return prev && list.includes(prev) ? prev : list[0] ?? '';
  },
});`,
    note: 'previous = { source, value } — предыдущий источник и предыдущее значение. Так linkedSignal заменяет ручную «склейку» состояния при изменении входных данных.',
  },
  {
    id: 'resource',
    title: '3. Async-загрузка: ручная стейт-машина → resource()',
    desc: 'Раньше для запроса держали три поля loading / data / error и переключали их руками (и ловили гонки запросов). resource() реактивно следит за params, сам запускает loader и отдаёт status / value / error.',
    beforeCode: `// Раньше: руками три поля
status = signal<'idle'|'loading'|'resolved'|'error'>('idle');
data = signal<Profile | null>(null);
error = signal<string | null>(null);

load(id: number) {
  this.status.set('loading');
  fetchProfile(id).then(
    (p) => { this.data.set(p); this.status.set('resolved'); },
    (e) => { this.error.set(e.message); this.status.set('error'); },
  );
}`,
    afterCode: `// Сейчас: resource() (experimental)
userId = signal(1);

profile = resource({
  params: () => ({ id: this.userId() }),
  loader: ({ params }) => fetchProfile(params.id),
});

// profile.status() / profile.value() / profile.error()
load(id: number) { this.userId.set(id); }`,
    note: 'resource() сам отменяет устаревший запрос (abortSignal) — «последний выигрывает», без ручной защиты от гонок. Для RxJS-источника есть rxResource(). API помечен @experimental.',
  },
  {
    id: 'interop',
    title: '4. Мост RxJS ↔ Signals: toSignal() / toObservable()',
    desc: 'Signals и RxJS дополняют друг друга. toObservable() превращает сигнал в поток (для debounce / switchMap), toSignal() — поток обратно в сигнал. Пример — поиск с debounce без ручных подписок.',
    beforeCode: `// Раньше: Subject + subscribe + отписка
term$ = new Subject<string>();
results: string[] = [];

ngOnInit() {
  this.term$.pipe(
    debounceTime(300), distinctUntilChanged(),
  ).subscribe(q => this.results = search(q));
}
// + ngOnDestroy для отписки`,
    afterCode: `// Сейчас: signal → поток → signal
term = signal('');

results = toSignal(
  toObservable(this.term).pipe(
    debounceTime(300), distinctUntilChanged(),
    map(q => search(q)),
  ),
  { initialValue: [] },
);`,
    note: 'toSignal() сам подписывается и отписывается по injection context. Правило: состояние — в сигналах, время и события (debounce, switchMap) — в RxJS.',
  },
  {
    id: 'rx-resource',
    title: '5. resource из Observable: rxResource()',
    desc: 'Если загрузчик возвращает Observable (как HttpClient), rxResource() оборачивает его в ту же модель resource: реактивные status / value / error и отмена устаревших запросов.',
    beforeCode: `// Раньше: switchMap + подписка
userId$ = new BehaviorSubject(1);

profile$ = this.userId$.pipe(
  switchMap(id => this.http.get<Profile>(\`/users/\${id}\`)),
);
// loading / error — руками, плюс отписка`,
    afterCode: `// Сейчас: rxResource
userId = signal(1);

profile = rxResource({
  params: () => ({ id: this.userId() }),
  stream: ({ params }) =>
    this.http.get<Profile>(\`/users/\${params.id}\`),
});
// profile.status() / value() / error()`,
    note: 'stream возвращает Observable. rxResource отписывается от устаревшего запроса при смене params. Для Promise-загрузчика — resource().',
  },
  {
    id: 'store',
    title: '6. Сложный кейс: реактивный signal-store',
    desc: 'Композиция сигналов в сервис-хранилище: приватные writable-сигналы под капотом, публичные computed для производного (count, total), методы для мутаций. Без BehaviorSubject и async pipe.',
    beforeCode: `// Раньше: RxJS-store
private _items = new BehaviorSubject<Line[]>([]);
readonly items$ = this._items.asObservable();

count$ = this.items$.pipe(map(totalQty));
total$ = this.items$.pipe(map(totalPrice));
// шаблон: count$ | async, total$ | async`,
    afterCode: `// Сейчас: signal-store
private _items = signal<Line[]>([]);
readonly items = this._items.asReadonly();

readonly count = computed(() => totalQty(this._items()));
readonly total = computed(() => totalPrice(this._items()));
// шаблон: store.count(), store.total()`,
    note: 'Приватный writable + публичный asReadonly() — инкапсуляция: менять состояние можно только через методы. Производное — computed: кэшируется и обновляется само.',
  },
];
