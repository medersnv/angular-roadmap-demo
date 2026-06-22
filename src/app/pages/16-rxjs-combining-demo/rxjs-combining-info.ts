export interface OperatorMoment {
  id: 'combineLatest' | 'forkJoin' | 'withLatestFrom' | 'zip';
  title: string;
  desc: string;
  /** ASCII-марбл: как операторы по-разному комбинируют эмиссии. */
  marble: string;
  /** Ключевой фрагмент сервиса (data-streams-over-actions). */
  code: string;
  /** Почему именно этот оператор, а не соседний. */
  why: string;
}

export const COMBINING_ESSENTIALS = [
  'combineLatest — на любое изменение отдаёт последние значения ВСЕХ потоков. Для «живых» комбинаций фильтров.',
  'forkJoin — ждёт complete всех источников и отдаёт один кортеж. Для параллельной загрузки конечного набора (HTTP).',
  'withLatestFrom — эмитит по ведущему потоку, «подмешивая» последние значения ведомых. Для «по клику возьми состояние».',
  'zip — строго попарная синхронизация по индексу: n-е с n-м, с буферизацией. Для «каждому действию — свой ответ».',
];

export const COMBINING_MOMENTS: OperatorMoment[] = [
  {
    id: 'combineLatest',
    title: '1. combineLatest — поиск + фильтр + пагинация → один запрос',
    desc: 'Три независимых input-потока (строка поиска, категория, страница) живут в приватных BehaviorSubject. combineLatest пересобирает их в один запрос при любом изменении, а switchMap отменяет устаревший вызов API.',
    marble: `term ──a───────b──────►
cat  ─────X────────────►
page ───────1──────────►
        combineLatest
out  ─────[aX1]─[bX1]───►`,
    code: `results$ = combineLatest([
  this.term$.pipe(debounceTime(300), distinctUntilChanged()),
  this.category$.pipe(distinctUntilChanged()),
  this.page$.pipe(distinctUntilChanged()),
]).pipe(
  map(([term, category, page]) => ({ term, category, page })),
  switchMap((q) => this.fetch(q)),   // один актуальный запрос
);`,
    why: 'Почему combineLatest, а не zip/merge: нужен снимок ПОСЛЕДНИХ значений всех фильтров на каждое изменение любого из них. zip ждал бы новое значение от каждого потока (поиск не сработал бы без смены категории), merge просто чередовал бы события, не комбинируя их.',
  },
  {
    id: 'forkJoin',
    title: '2. forkJoin — несколько JSON конфигов → единый объект',
    desc: 'На старте приложения нужно параллельно загрузить theme.json, features.json, i18n.json и собрать в один config. forkJoin запускает все запросы разом и эмитит результат, только когда завершились все.',
    marble: `theme ───────●| (complete)
feat  ────●| (complete)
i18n  ──────────●| (complete)
            forkJoin
out   ──────────────[●●●]|`,
    code: `forkJoin({
  theme:    this.http.get('theme.json'),
  features: this.http.get('features.json'),
  i18n:     this.http.get('i18n.json'),
}).pipe(
  map(({ theme, features, i18n }) => ({ ...theme, ...features, ...i18n })),
).subscribe((config) => this.configSubject.next(config));`,
    why: 'Почему forkJoin, а не combineLatest: источники конечны (HTTP завершается), и частичный результат бессмысленен — config нужен целиком. forkJoin отдаёт ОДИН кортеж после complete всех; combineLatest эмитил бы промежуточные «полузагруженные» комбинации по мере прихода каждого ответа.',
  },
  {
    id: 'withLatestFrom',
    title: '3. withLatestFrom — submit по клику берёт последнее состояние формы',
    desc: 'Поток кликов по «Отправить» — ведущий. Поток значений формы — ведомый. withLatestFrom эмитит только в момент клика и подмешивает актуальное значение формы; печатая в полях, заявку не создашь.',
    marble: `click ──────C─────────C─►
form  ─v1──v2──v3────v4──►
       withLatestFrom(form)
out   ──────[C,v2]───[C,v4]►`,
    code: `this.submit$.pipe(
  withLatestFrom(this.formValue$),   // клик ведёт, форма — последнее значение
  map(([, value]) => value),
  filter(() => this.form.valid),     // проверяем валидность в момент клика
  takeUntilDestroyed(),
).subscribe((reg) => this.acceptedSubject.next([reg, ...this.acceptedSubject.value]));`,
    why: 'Почему withLatestFrom, а не combineLatest: ведущий поток — клик. combineLatest эмитил бы на каждое нажатие клавиши в форме (ведомый поток триггерит выход) — получили бы «отправку» при вводе. withLatestFrom игнорирует изменения ведомого и стреляет строго по клику.',
  },
  {
    id: 'zip',
    title: '4. zip — склейка двух потоков строго по индексу',
    desc: 'zip берёт по одному значению из КАЖДОГО потока и склеивает их по позиции: 1-е с 1-м, 2-е со 2-м. Пара рождается только когда оба потока выдали значение; «обогнавший» поток буферизуется и ждёт отстающего. В демо вы сами управляете двумя потоками (буквы и числа) — отправьте 3 буквы и 1 число, и две буквы останутся ждать своих чисел.',
    marble: `letters ─A─B─C─────────►
numbers ──1────2────3──►
            zip
out     ──[A1]─[B2]─[C3]►`,
    code: `zipped$ = zip(this.letters$, this.numbers$).pipe(
  map(([letter, num]) => \`\${letter}\${num}\`),
);
// A1, B2, C3 — по индексу; лишние буквы ждут свои числа в буфере`,
    why: 'Почему zip, а не combineLatest/withLatestFrom: нужна строгая склейка 1-к-1 по индексу. combineLatest выдавал бы «срез последних» с декартовыми повторами (A1, A2, B2…), а withLatestFrom терял бы значения ведомого потока, для которых ещё нет пары. Только zip гарантирует ровно одну пару на каждую позицию.',
  },
];
