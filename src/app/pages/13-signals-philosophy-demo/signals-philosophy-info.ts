import { SignalMoment } from '../09-signals-basics-demo/signals-basics-info';

export type { SignalMoment };

export interface MentalModelRow {
  aspect: string;
  signals: string;
  rxjs: string;
}

export const SIGNALS_PHILOSOPHY_ESSENTIALS = [
  'Signals — синхронное состояние «сейчас»: всегда есть текущее значение, читается чтением (pull).',
  'RxJS — асинхронные потоки во времени: значения приходят сами (push), их нужно подписать.',
  'Правило: локальный UI-стейт и деривация — signals; события, время, отмена, гонки — RxJS.',
  'Мост между мирами: toSignal(observable$) и toObservable(signal) из @angular/core/rxjs-interop.',
];

export const SIGNALS_VS_RXJS: MentalModelRow[] = [
  { aspect: 'Природа', signals: 'Значение «сейчас» (синхронно)', rxjs: 'Поток значений во времени (асинхронно)' },
  { aspect: 'Модель', signals: 'Pull — тянем значение чтением count()', rxjs: 'Push — значения приходят в subscribe' },
  { aspect: 'Текущее значение', signals: 'Есть всегда', rxjs: 'Может не быть, пока не эмитнул' },
  { aspect: 'Подписки', signals: 'Не нужны — автотрекинг зависимостей', rxjs: 'Нужны subscribe / unsubscribe' },
  { aspect: 'Композиция', signals: 'computed()', rxjs: 'map / filter / combineLatest / switchMap' },
  { aspect: 'Сильная сторона', signals: 'UI-стейт, деривация, шаблоны', rxjs: 'События, debounce, отмена, гонки запросов' },
];

export interface FrameworkRow {
  framework: string;
  create: string;
  read: string;
  derived: string;
  effect: string;
}

/** Сигналы — консенсус индустрии: один и тот же приём в каждом фреймворке. */
export const CROSS_FRAMEWORK: FrameworkRow[] = [
  {
    framework: 'Angular',
    create: 'signal(0)',
    read: 'count()',
    derived: 'computed(() => count() * 2)',
    effect: 'effect(() => log(count()))',
  },
  {
    framework: 'SolidJS',
    create: 'createSignal(0)',
    read: 'count()',
    derived: 'createMemo(() => count() * 2)',
    effect: 'createEffect(() => log(count()))',
  },
  {
    framework: 'Vue 3',
    create: 'ref(0)',
    read: 'count.value',
    derived: 'computed(() => count.value * 2)',
    effect: 'watchEffect(() => log(count.value))',
  },
  {
    framework: 'Svelte 5',
    create: '$state(0)',
    read: 'count',
    derived: '$derived(count * 2)',
    effect: '$effect(() => log(count))',
  },
  {
    framework: 'Preact',
    create: 'signal(0)',
    read: 'count.value',
    derived: 'computed(() => count.value * 2)',
    effect: 'effect(() => log(count.value))',
  },
];

export const SIGNALS_PHILOSOPHY_MOMENTS: SignalMoment[] = [
  {
    id: 'derived',
    title: '1. Производное значение: RxJS combineLatest → computed()',
    desc: 'Один и тот же total = a + b. Раньше для связи двух источников брали Subjects + combineLatest + async pipe. С сигналами это просто computed() — синхронно и без подписок.',
    beforeCode: `// Раньше: RxJS
a$ = new BehaviorSubject(2);
b$ = new BehaviorSubject(3);

total$ = combineLatest([this.a$, this.b$]).pipe(
  map(([a, b]) => a + b),
);
// шаблон: {{ total$ | async }}`,
    afterCode: `// Сейчас: signals
a = signal(2);
b = signal(3);

total = computed(() => this.a() + this.b());

// шаблон: {{ total() }}`,
    note: 'Для деривации локального состояния signals короче. RxJS остаётся незаменим там, где есть время и события: debounce, switchMap, отмена. Мост — toSignal() / toObservable().',
  },
  {
    id: 'signal-forms',
    title: '2. Формы: Reactive Forms → модель на сигналах',
    desc: 'Раньше форма — это FormGroup / FormControl с подпиской на valueChanges. «Сигнальный» подход: модель — это signals, валидность — computed(). Тот же UX без RxJS-подписок.',
    beforeCode: `// Раньше: Reactive Forms
form = new FormGroup({
  name: new FormControl('', Validators.required),
  age: new FormControl(0),
});
// form.valid, form.value, form.valueChanges.subscribe(...)`,
    afterCode: `// Сейчас: модель на сигналах
name = signal('');
age = signal(0);

valid = computed(() => name().trim().length > 0);
value = computed(() => ({ name: name(), age: age() }));`,
    note: 'Это «ручная» сигнальная форма. Официальный экспериментальный API form() формализует ровно эту идею — см. блок ниже.',
  },
];

export interface SignalFormsPreview {
  intro: string;
  code: string;
  docUrl: string;
}

export const SIGNAL_FORMS_PREVIEW: SignalFormsPreview = {
  intro:
    'Signal Forms — экспериментальный API (отдельно от @angular/forms, в v20.3 ещё недоступен). Идея: модель формы — это signal, а form() строит над ней дерево полей (FieldTree) с валидаторами.',
  code: `import { form, Control, required } from '@angular/forms/signals';

// 1. модель — обычный signal
model = signal({ name: '', age: 0 });

// 2. form() строит FieldTree поверх модели
profileForm = form(this.model, (path) => {
  required(path.name);
});

// 3. в шаблоне поля связываются через [control]
// <input [control]="profileForm.name" />
// profileForm().valid()   model().name`,
  docUrl: 'https://angular.dev/essentials/signal-forms',
};
