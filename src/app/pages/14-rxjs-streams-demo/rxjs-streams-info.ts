export interface StreamMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  beforeLabel: string;
  afterLabel: string;
  note?: string;
  /** id живого демо под кодом (если есть). */
  live?: 'subjects' | 'cold-hot' | 'replay-compare';
}

export const STREAMS_ESSENTIALS = [
  'Observable — не контейнер, а ленивая функция: описывает, КАК произвести данные и КАК прибрать ресурсы. Пока не подписался — ничего не происходит.',
  'Контракт: next* (error | complete)?. После error/complete поток закрыт навсегда, новые значения не придут.',
  'Promise — eager (стартует сразу) и одно значение; Observable — lazy (стартует на подписку), 0…∞ значений и поддерживает отмену (xhr.abort()).',
  'Cold (unicast) — каждый подписчик запускает свой цикл (новый HTTP). Hot (multicast) через Subject — один источник на многих.',
  'BehaviorSubject — текущее состояние (нужно начальное); ReplaySubject(n) — повтор n прошлых; AsyncSubject — только последнее и только после complete.',
];

export const STREAMS_MOMENTS: StreamMoment[] = [
  {
    id: 'lazy',
    title: '1. Observable vs Promise: lazy против eager',
    desc: 'Promise начинает работу в момент создания, даже если результат никому не нужен. Observable — это рецепт: тело запускается только при subscribe, и столько раз, сколько подписок. Отсюда — отменяемость и переиспользование.',
    beforeLabel: 'Promise (eager)',
    afterLabel: 'Observable (lazy)',
    beforeCode: `// Запрос уходит СРАЗУ, ещё до await
const p = fetch('/api/user'); // уже летит
// одно значение, отменить нельзя (без AbortController)
const user = await p;`,
    afterCode: `// Это лишь описание — запрос НЕ уходит
const user$ = this.http.get('/api/user');
// уйдёт только на подписку; отписка → xhr.abort()
const sub = user$.subscribe();
sub.unsubscribe(); // запрос прерван`,
    note: 'Лень = контроль: запрос можно не запускать, запускать многократно (retry) или прерывать (switchMap). Promise так не умеет — он «горит» один раз и сразу.',
  },
  {
    id: 'contract',
    title: '2. Контракт потока: next* (error | complete)?',
    desc: 'Грамматика Observable строгая: любое число next, затем максимум одно терминальное событие — error ИЛИ complete. После него поток закрыт, teardown-логика вызвана, новые значения невозможны.',
    beforeLabel: 'Нарушение ожиданий',
    afterLabel: 'Правильный контракт',
    beforeCode: `// Ошибка ⇒ поток мёртв. Эмиссии после error
// игнорируются, а onError без catchError — крэш
source$.subscribe({
  next: v => use(v),
  // нет error-обработчика → ошибка «всплывёт»
});`,
    afterCode: `source$.pipe(
  catchError(err => of(fallback)), // обрабатываем терминал
).subscribe({
  next: v => use(v),
  complete: () => done(), // ровно один раз
});`,
    note: 'Уведомления сериализуются: следующий next не начнётся, пока не отработал текущий обработчик. Поэтому внутри подписки нет гонок между значениями одного потока.',
  },
  {
    id: 'subjects',
    title: '3. Subjects: multicasting и состояние',
    desc: 'Subject — это одновременно Observable и Observer: он раздаёт одно значение многим подписчикам (multicast). BehaviorSubject хранит текущее состояние (SSOT), ReplaySubject(n) — буфер истории для поздних подписчиков. Ниже живой пример: статус через BehaviorSubject, последние 5 сообщений через ReplaySubject.',
    beforeLabel: 'BehaviorSubject (состояние)',
    afterLabel: 'ReplaySubject (история)',
    beforeCode: `// Текущее состояние UI: всегда есть «последнее»
private status = new BehaviorSubject<Status>('online');
readonly status$ = this.status.asObservable();
// новый подписчик мгновенно получает текущий статус`,
    afterCode: `// Кэш последних 5 сообщений для тех, кто вошёл позже
private messages = new ReplaySubject<Msg>(5);
readonly messages$ = this.messages.asObservable();
// новый подписчик получает последние 5 сразу при subscribe`,
    note: 'AsyncSubject — третий тип: эмитит только ПОСЛЕДНЕЕ значение и только после complete (как «итог операции»). Все три раздают значения через .asObservable() — наружу торчит read-only поток.',
    live: 'subjects',
  },
  {
    id: 'cold-hot',
    title: '4. Cold vs Hot и shareReplay против дублей HTTP',
    desc: 'По умолчанию HttpClient-поток холодный: каждая подписка — новый запрос. Если один и тот же поток читают несколько компонентов (или несколько AsyncPipe), запрос уходит несколько раз. shareReplay(1) превращает поток в горячий и переиспользует ответ.',
    beforeLabel: 'Cold — дубли запросов',
    afterLabel: 'shareReplay — один запрос',
    beforeCode: `// 3 подписки = 3 одинаковых HTTP-запроса
data$ = this.http.get('/api/config');
// template: {{ data$ | async }} в трёх местах → 3 запроса`,
    afterCode: `// 3 подписки = 1 HTTP-запрос, ответ кэширован
data$ = this.http.get('/api/config').pipe(
  shareReplay({ bufferSize: 1, refCount: true }),
);`,
    note: 'share() делает поток горячим «на лету» без буфера; shareReplay(1) ещё и отдаёт последнее значение поздним подписчикам. refCount: true отключает источник, когда подписчиков не осталось (важно для бесконечных потоков — иначе утечка).',
    live: 'cold-hot',
  },
  {
    id: 'replay-vs-share',
    title: '5. ReplaySubject(5) vs shareReplay(5): в чём разница',
    desc: 'Оба буферизуют последние N значений и переигрывают их новым подписчикам — поэтому их постоянно путают. Но природа разная: ReplaySubject — это сам источник (Subject), в который вы пушите значения; shareReplay — оператор НАД существующим Observable, который подписывается на него один раз и кэширует результат.',
    beforeLabel: 'ReplaySubject(5) — вы источник',
    afterLabel: 'shareReplay(5) — обёртка источника',
    beforeCode: `// Subject: upstream-а нет, ВЫ проталкиваете значения сами
private events = new ReplaySubject<number>(5); // буфер 5
readonly events$ = this.events.asObservable();

emit(v: number) { this.events.next(v); }
// новый подписчик получает последние 5 пушнутых значений`,
    afterCode: `// Оператор поверх ХОЛОДНОГО Observable (upstream есть)
readonly feed$ = this.http.get('/api/feed').pipe(
  shareReplay(5), // 1 подписка на источник + буфер 5 на всех
);
// много подписчиков → ОДИН запрос; новый получает последние 5`,
    note: 'Сходство — буфер и replay для поздних подписчиков. Разница: у ReplaySubject нет upstream (источник — вы, через .next()); shareReplay оборачивает чужой Observable, подписывается на него один раз, мультикастит и кэширует — внутри он сам использует ReplaySubject. Правило: ReplaySubject — когда производитель ВЫ (события/состояние в сервисе); shareReplay — когда нужно разделить и закэшировать результат чужого потока (HTTP), чтобы не дублировать запрос.',
    live: 'replay-compare',
  },
];
