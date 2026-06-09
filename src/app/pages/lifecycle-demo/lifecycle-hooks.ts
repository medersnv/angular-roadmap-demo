export interface LifecycleHookInfo {
  phase: string;
  method: string;
  summary: string;
  whenToUse: string;
}

export const CONSTRUCTOR_VS_NGONINIT = {
  title: 'constructor vs ngOnInit — в чём разница?',
  points: [
    {
      label: 'constructor',
      text: 'Вызывается первым. @Input ещё недоступны. Angular ещё не готов. Здесь только inject() и простая инициализация полей.',
    },
    {
      label: 'ngOnInit',
      text: 'Вызывается один раз после первого ngOnChanges. Все @Input уже установлены. Здесь загружают данные, подписываются на сервисы, запускают логику компонента.',
    },
    {
      label: 'Правило',
      text: 'Не делай в constructor то, что зависит от @Input или DOM. Для старта компонента используй ngOnInit.',
    },
  ],
};

export const LIFECYCLE_HOOKS: LifecycleHookInfo[] = [
  {
    phase: 'Создание',
    method: 'constructor',
    summary: 'Обычный конструктор JavaScript-класса. Вызывается при создании экземпляра компонента.',
    whenToUse: 'inject() для DI, объявление полей. Не использовать @Input, HTTP-запросы, работу с DOM.',
  },
  {
    phase: 'Change Detection',
    method: 'ngOnInit',
    summary: 'Вызывается один раз после инициализации всех @Input компонента.',
    whenToUse: 'Стартовая логика: загрузка данных, подписка на сервис, инициализация формы. Главная точка «запуска» компонента.',
  },
  {
    phase: 'Change Detection',
    method: 'ngOnChanges',
    summary: 'Вызывается при каждом изменении @Input (если изменилась ссылка на объект).',
    whenToUse: 'Реакция на новые @Input: пересчёт данных, обновление дочернего состояния, реакция на смену конфига от родителя.',
  },
  {
    phase: 'Change Detection',
    method: 'ngDoCheck',
    summary: 'Вызывается при каждой проверке изменений компонента.',
    whenToUse: 'Когда Angular не видит изменения сам (мутация объекта, сторонние библиотеки). Кастомная проверка изменений. Использовать осторожно — вызывается часто.',
  },
  {
    phase: 'Change Detection',
    method: 'ngAfterContentInit',
    summary: 'Вызывается один раз после инициализации спроецированного контента (<ng-content>).',
    whenToUse: 'Работа с контентом от родителя через ng-content: доступ к @ContentChild, инициализация projected content.',
  },
  {
    phase: 'Change Detection',
    method: 'ngAfterContentChecked',
    summary: 'Вызывается при каждой проверке спроецированного контента.',
    whenToUse: 'Редко нужен. Только если нужно отслеживать изменения projected content при каждой проверке. Чаще — антипаттерн.',
  },
  {
    phase: 'Change Detection',
    method: 'ngAfterViewInit',
    summary: 'Вызывается один раз после инициализации шаблона компонента.',
    whenToUse: 'Работа с DOM и @ViewChild: фокус на input, инициализация canvas/chart/map, запуск сторонней библиотеки, привязанной к элементу.',
  },
  {
    phase: 'Change Detection',
    method: 'ngAfterViewChecked',
    summary: 'Вызывается при каждой проверке шаблона компонента.',
    whenToUse: 'Редко нужен. Вызывается очень часто — легко получить бесконечный цикл. Избегать тяжёлой логики.',
  },
  {
    phase: 'Rendering',
    method: 'afterNextRender',
    summary: 'Вызывается один раз после следующего рендера всех компонентов в DOM.',
    whenToUse: 'DOM-операции после первого рендера: измерение размеров, scroll, интеграция с browser API. Безопаснее прямого доступа в ngAfterViewInit.',
  },
  {
    phase: 'Rendering',
    method: 'afterEveryRender',
    summary: 'Вызывается после каждого рендера всех компонентов в DOM.',
    whenToUse: 'Синхронизация с DOM после каждого рендера (resize observer, reposition). Использовать осторожно — вызывается часто.',
  },
  {
    phase: 'Уничтожение',
    method: 'ngOnDestroy',
    summary: 'Вызывается один раз перед уничтожением компонента.',
    whenToUse: 'Очистка: unsubscribe, clearInterval, removeEventListener, отмена HTTP-запросов. Обязателен при подписках и таймерах.',
  },
];
