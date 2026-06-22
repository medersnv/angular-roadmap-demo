export interface TheoryMoment {
  id: string;
  title: string;
  desc: string;
  code?: string;
  note?: string;
  /** id живого демо под кодом. */
  live?: 'pull-push' | 'schedulers';
}

export const THEORY_ESSENTIALS = [
  'Генезис: RxJS родился в Microsoft (команда Эрика Мейера, проект Volta, 2011) как «вывернутый» Iterator: развернули стрелки Pull → получили Push.',
  'Observable — ленивая функция: описывает, как произвести данные и как прибрать ресурсы (TeardownLogic), а не готовый контейнер.',
  '.pipe() компонует чистые функции через reduce — это даёт tree-shaking: в бандл попадают только используемые операторы.',
  'Schedulers управляют временем и контекстом: asap (микрозадачи), async (макрозадачи), animationFrame (кадр перерисовки).',
  'Будущее (v19+): RxResource и Signals — декларативная загрузка данных с автоотменой по switchMap при смене входных сигналов.',
];

export const THEORY_MOMENTS: TheoryMoment[] = [
  {
    id: 'genesis',
    title: '1. Генезис: математическая дуальность',
    desc: 'RxJS — это инверсия паттерна Iterator. Команда Эрика Мейера (Microsoft, проект Volta, 2011) заметила: если «развернуть стрелки» в IEnumerable (Pull-модель, потребитель тянет), получается IObservable (Push-модель, производитель толкает). Это позволило применить ту же алгебру операторов (LINQ/map/filter), что и для коллекций, к потокам событий во времени.',
    code: `// Дуальность: одно — зеркало другого
// Pull (Iterator):  T   next()        — потребитель спрашивает
// Push (Observable): (T) => void next  — производитель сообщает
//
// IEnumerable<T>  →  «развернули стрелки»  →  IObservable<T>`,
    note: 'Отсюда сила RxJS: коллекция значений во времени = обычная коллекция, к которой применимы map/filter/reduce. Время становится просто ещё одним измерением данных.',
    live: 'pull-push',
  },
  {
    id: 'as-function',
    title: '2. Observable как функция, а не контейнер',
    desc: 'Observable — не «массив значений», а лениво вычисляемая функция: она знает, как ПРОИЗВЕСТИ данные и как ОЧИСТИТЬ ресурсы при отписке. Тело (producer) запускается на каждый subscribe; возвращаемая TeardownLogic вызывается при unsubscribe/complete/error.',
    code: `const timer$ = new Observable<number>((subscriber) => {
  let n = 0;
  const id = setInterval(() => subscriber.next(n++), 1000);
  // TeardownLogic: как прибрать ресурсы при отписке
  return () => clearInterval(id);
});
// пока никто не подписан — setInterval не создан (лень)`,
    note: 'Контракт строгий: next* (error | complete)?. После терминала поток закрыт, teardown вызван. Уведомления сериализуются — следующий next не стартует, пока не отработал текущий обработчик.',
  },
  {
    id: 'piping',
    title: '3. Piping и цепочка подписчиков',
    desc: '.pipe() (v5.5+) компонует операторы как чистые функции через reduce — это критично для tree-shaking (неиспользуемые операторы не попадают в бандл). При subscribe строится иерархия Subscriber: каждый оператор оборачивает предыдущий и вызывает this.destination.next(), проталкивая данные по цепочке.',
    code: `// pipe = reduce(compose) по операторам
source$.pipe(
  filter(x => x > 0),  // оборачивает destination
  map(x => x * 2),     // оборачивает предыдущий
);
// subscribe строит цепочку Subscriber'ов:
// map → filter → source, данные идут next() вниз по destination`,
    note: 'До pipe операторы были методами прототипа (patch operators) — они тащили в бандл весь RxJS. Pipeable-операторы — это просто функции, поэтому бандлер выкидывает неиспользуемое.',
  },
  {
    id: 'vs-promise',
    title: '4. Технический баттл: Observable vs Promise',
    desc: 'Три ключевых отличия: исполнение, количество значений и отмена. Promise — eager (стартует сразу), одно значение, без нативной отмены. Observable — lazy (стартует на подписку), 0…∞ значений, отмена через TeardownLogic.',
    code: `// Promise:    eager · 1 значение · без отмены
// Observable: lazy  · 0…∞       · отмена через unsubscribe
//
// В Angular отписка от HttpClient реально прерывает запрос:
sub = this.http.get('/api').subscribe();
sub.unsubscribe(); // → xhr.abort() под капотом`,
    note: 'Именно ленивость и отменяемость делают возможными switchMap (отмена устаревшего запроса), retry (повторный запуск) и debounce — Promise так не умеет, он «горит» один раз.',
  },
  {
    id: 'schedulers',
    title: '5. Schedulers: двигатель времени и Event Loop',
    desc: 'Scheduler определяет, КОГДА и в каком контексте Event Loop доставляются уведомления. asapScheduler — очередь микрозадач (как Promise, высокий приоритет). asyncScheduler — макрозадачи (setTimeout, высвобождает поток для UI). animationFrameScheduler — синхронизация с кадром перерисовки экрана.',
    code: `of(1, 2, 3, asyncScheduler)      // эмиссия через макрозадачи
source$.pipe(observeOn(asapScheduler))    // доставка в микрозадачах
source$.pipe(observeOn(animationFrameScheduler)) // к кадру отрисовки`,
    note: 'Порядок доставки: синхронный код → asap (микрозадачи) → async (макрозадачи). Это тот же порядок, что Promise.then vs setTimeout. Запустите демо ниже и сравните.',
    live: 'schedulers',
  },
  {
    id: 'data-streams',
    title: '6. Паттерн «Data Streams over Actions»',
    desc: 'Идеология: переход от императивных команд («сделай X сейчас») к реактивному наблюдению за потоками. Сервисы инкапсулируют состояние в приватных BehaviorSubject и выставляют наружу read-only Observable через .asObservable(). Компоненты не дёргают данные — они наблюдают.',
    code: `@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = new BehaviorSubject<Item[]>([]);
  readonly items$ = this.items.asObservable();   // read-only наружу
  readonly total$ = this.items$.pipe(
    map(list => list.reduce((s, i) => s + i.price, 0)),
  );
  add(item: Item) { this.items.next([...this.items.value, item]); }
}`,
    note: 'Состояние имеет один источник истины (SSOT), мутации проходят через методы сервиса, наружу — только чтение. Производные данные (total$) выводятся операторами, а не пересчитываются руками.',
  },
  {
    id: 'future',
    title: '7. Будущее: Resource API и Signals (v19+)',
    desc: 'rxResource / resource — высокоуровневая абстракция загрузки данных поверх потоков и сигналов. Реактивные параметры: при изменении входного сигнала запрос автоматически перезапускается с отменой предыдущего (как switchMap), а статус загрузки и ошибки доступны как сигналы.',
    code: `// Signals + RxJS: реактивные параметры с автоотменой
private readonly userId = signal(1);
protected readonly user = rxResource({
  request: () => this.userId(),               // реактивный вход
  loader: ({ request }) => this.http.get(\`/api/users/\${request}\`),
});
// user.value() / user.isLoading() / user.error() — сигналы
// смена userId → старый запрос отменяется автоматически`,
    note: 'Это не замена RxJS, а мост: потоки остаются для сложной оркестрации событий, а Resource API закрывает типовой сценарий «загрузить данные по реактивному параметру» декларативно.',
  },
];
