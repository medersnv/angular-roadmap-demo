export interface SignalMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export const SIGNALS_BASICS_ESSENTIALS = [
  'signal() — writable-контейнер значения: читаем как count(), пишем через set() / update().',
  'computed() — производный readonly-сигнал: пересчитывается лениво и кэшируется (мемоизация).',
  'effect() — побочный эффект: запускается сам, когда меняется любой прочитанный внутри сигнал.',
  'Writable vs Readonly: signal() можно менять; computed() и signal.asReadonly() — только читать.',
];

export const SIGNALS_BASICS_MOMENTS: SignalMoment[] = [
  {
    id: 'computed',
    title: '1. Производное состояние: геттер → computed()',
    desc: 'Раньше производное значение считал метод/геттер — он выполнялся на каждой проверке. computed() кэширует результат и пересчитывает его только при изменении зависимостей.',
    beforeCode: `// Раньше: doubled — отдельное поле
base = 2;
doubled = 4;

inc() {
  this.base++;
  this.doubled = this.base * 2; // не забыть!
}`,
    afterCode: `// Сейчас: computed() выводит из base
base = signal(2);
doubled = computed(() => this.base() * 2);

inc() { this.base.update(v => v + 1); }
// doubled пересчитается сам — забыть нельзя`,
    note: 'computed() возвращает Signal (readonly): нет set()/update(), его нельзя рассинхронить. Значение кэшируется и пересчитывается только при изменении base. Наружу «только чтение» — base.asReadonly().',
  },
  {
    id: 'effect',
    title: '2. Реакция на изменение: ручное дублирование → effect()',
    desc: 'Раньше побочный эффект (лог, аналитика, запись в localStorage) приходилось вызывать в каждом обработчике или в ngOnChanges. effect() объявляется один раз и срабатывает на любое изменение прочитанных сигналов.',
    beforeCode: `// Раньше: эффект руками в каждом месте
value = 0;

inc()   { this.value++;     this.log(); }
dec()   { this.value--;     this.log(); }
reset() { this.value = 0; /* забыли log() */ }`,
    afterCode: `// Сейчас: effect() — объявлен один раз
value = signal(0);

constructor() {
  effect(() => this.log(this.value()));
}

inc()   { this.value.update(v => v + 1); }
reset() { this.value.set(0); } // log() сам`,
    note: 'effect() создаётся в injection context (поле или конструктор) и сам отписывается при уничтожении компонента. Эффекты — для side-effects (лог, DOM, синхронизация), а не для вычисления состояния.',
  },
  {
    id: 'untracked',
    title: '3. Чтение без подписки: untracked()',
    desc: 'Иногда внутри effect нужно прочитать сигнал, но НЕ подписываться на него. untracked() возвращает текущее значение, не добавляя его в зависимости — эффект не будет перезапускаться на его изменения.',
    beforeCode: `// Наивно: читаем оба сигнала напрямую
effect(() => {
  log(this.user(), this.clicks());
  // сработает и на user, и на clicks
});`,
    afterCode: `// untracked: clicks не подписывает
effect(() => {
  const u = this.user();                    // подписка
  const c = untracked(() => this.clicks());  // без подписки
  log(u, c);
  // сработает только на user
});`,
    note: 'untracked() помогает избегать лишних запусков и циклов: читать «сопутствующее» состояние, не завязывая на него реакцию. Доступен и внутри computed().',
  },
  {
    id: 'cleanup',
    title: '4. Очистка эффекта: onCleanup',
    desc: 'Колбэк effect получает функцию onCleanup — в ней закрываем таймеры и подписки. Она вызывается перед каждым повторным запуском эффекта и при уничтожении: setup и teardown лежат рядом, забыть очистку нельзя.',
    beforeCode: `// Раньше: setup и teardown врозь
ngOnInit()    { this.id = setInterval(tick, 1000); }
ngOnDestroy() { clearInterval(this.id); }

// при смене скорости легко забыть очистить
// → таймеры копятся (утечка)`,
    afterCode: `// Сейчас: onCleanup рядом с setup
effect((onCleanup) => {
  const id = setInterval(tick, this.speed());
  onCleanup(() => clearInterval(id));
  // смена speed → старый таймер очищен, новый создан
});`,
    note: 'onCleanup вызывается перед каждым перезапуском эффекта (изменился speed) и один раз при уничтожении компонента. Идеально для таймеров, слушателей и подписок.',
  },
  {
    id: 'equality',
    title: '5. Своя проверка равенства: equal',
    desc: 'По умолчанию сигнал сравнивает значения через Object.is — новый объект с тем же содержимым считается изменением. Опция equal задаёт свою логику и отсекает лишние пересчёты downstream.',
    beforeCode: `// По умолчанию: ссылочное равенство
user = signal({ id: 1, name: 'Анна' });

// новый объект с тем же id = «изменение»
user.set({ id: 1, name: 'Анна' });
// → computed/effect пересчитываются зря`,
    afterCode: `// equal: сравниваем по id
user = signal(
  { id: 1, name: 'Анна' },
  { equal: (a, b) => a.id === b.id },
);

user.set({ id: 1, name: 'Анна' });
// тот же id → обновление пропускается`,
    note: 'equal есть и у signal(), и у computed(). Полезно для объектов/массивов из API, чтобы не дёргать UI, когда «по смыслу» ничего не поменялось.',
  },
];
