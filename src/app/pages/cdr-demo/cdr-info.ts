export interface CdrMethodInfo {
  method: string;
  summary: string;
}

export interface CdrExampleInfo {
  id: 'mark-for-check' | 'detach-detect' | 'detach-reattach';
  title: string;
  description: string;
  hint: string;
  /** Типичные задачи, где уместна эта пара методов. */
  useCases?: string[];
}

export const CDR_ESSENTIALS = [
  'ChangeDetectorRef — базовый класс для ручного управления деревом change detection.',
  'markForCheck() — помечает OnPush-компонент «грязным», чтобы его проверили в следующем цикле CD.',
  'detach() / reattach() — отключают и снова подключают компонент к дереву CD.',
  'detectChanges() — проверяет компонент и детей сразу. Часто вместе с detach().',
];

export const CDR_METHODS: CdrMethodInfo[] = [
  {
    method: 'markForCheck()',
    summary: 'Помечает view для проверки. Основной способ обновить OnPush после внешних изменений.',
  },
  {
    method: 'detach()',
    summary: 'Отключает view от дерева CD. Пока detached — компонент не проверяется, даже если «грязный».',
  },
  {
    method: 'detectChanges()',
    summary: 'Проверяет этот view и детей немедленно. Используют с detach() для локального CD.',
  },
  {
    method: 'reattach()',
    summary: 'Снова подключает ранее detached view к дереву CD.',
  },
];

export const CDR_EXAMPLES: CdrExampleInfo[] = [
  {
    id: 'mark-for-check',
    title: '1. markForCheck() + OnPush',
    description:
      'OnPush-компонент с setInterval: данные меняются вне шаблонных событий — нужен markForCheck().',
    hint: 'Счётчик растёт каждую секунду. Без markForCheck() OnPush не обновился бы.',
    useCases: [
      'WebSocket / SSE — сообщения приходят в callback, это не событие Angular',
      'RxJS subscribe без async pipe — эмиссия в ngOnInit не запускает проверку OnPush',
      'setTimeout / Promise в runOutsideAngular — Zone не запустит CD сам',
      'Callback сторонней библиотеки (Chart.js, Leaflet, карта, редактор)',
      'OnPush-виджет после мутации @Input родителем (лучше передавать новый объект)',
    ],
  },
  {
    id: 'detach-detect',
    title: '2. detach() + detectChanges()',
    description:
      'Большой список с часто меняющимися данными: detach() отключает CD, detectChanges() запускает его раз в 5 сек.',
    hint: 'Данные в провайдере меняются каждые 200 мс, но UI обновляется только по detectChanges().',
    useCases: [
      'Тяжёлый список / таблица — данные меняются часто, UI достаточно обновлять раз в N секунд',
      'Дашборд с live-метриками (биржа, мониторинг) — снизить нагрузку от глобального CD',
      'Canvas / WebGL / большой DOM — перерисовка по таймеру, а не на каждый тик данных',
      'Во время drag / scroll анимации — detach на время жеста, detectChanges() по завершении',
      'Read-only представление с потоком событий — контролируешь момент перерисовки сам',
    ],
  },
  {
    id: 'detach-reattach',
    title: '3. detach() + reattach()',
    description:
      'Живые данные: при снятом чекбоксе компонент detached и не реагирует; при включении — reattach().',
    hint: 'Снимите «Live Update» — число в DataProvider растёт, но UI заморожен до reattach().',
  },
];
