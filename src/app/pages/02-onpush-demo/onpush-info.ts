export interface StrategyInfo {
  strategy: string;
  summary: string;
  whenToUse: string;
}

export interface BestPractice {
  title: string;
  description: string;
}

export const ONPUSH_VS_DEFAULT = {
  title: 'Default vs OnPush — в чём разница?',
  points: [
    {
      label: 'Default',
      text: 'Angular проверяет компонент при каждой проверке изменений в приложении — даже если @Input не менялись.',
    },
    {
      label: 'OnPush',
      text: 'Angular проверяет компонент только если изменилась ссылка @Input, сработало событие в шаблоне, или пришёл async pipe / signal.',
    },
    {
      label: 'Правило',
      text: 'OnPush — для «глупых» компонентов с @Input. Default — когда компонент часто меняется изнутри без новых @Input.',
    },
  ],
};

export const STRATEGIES: StrategyInfo[] = [
  {
    strategy: 'Default',
    summary: 'Проверка при каждом цикле change detection в дереве компонентов.',
    whenToUse: 'Формы, компоненты с частым локальным состоянием, прототипы. Проще, но больше лишних проверок.',
  },
  {
    strategy: 'OnPush',
    summary: 'Проверка только при новой ссылке @Input, событии в шаблоне, signal или async pipe.',
    whenToUse: 'Презентационные компоненты, списки, UI-kit. Меньше проверок — лучше производительность.',
  },
];

export const BEST_PRACTICES: BestPractice[] = [
  {
    title: 'Не мутируй @Input',
    description: 'Меняй объект целиком: this.user = { ...this.user, name: "новое" }. Иначе OnPush не увидит изменение.',
  },
  {
    title: 'Используй immutable data',
    description: 'Новый массив через spread или filter/map, а не push/splice в существующий массив.',
  },
  {
    title: 'async pipe',
    description: 'Подписка через | async в шаблоне — Angular сам помечает компонент для проверки.',
  },
  {
    title: 'signals',
    description: 'signal() и input() — современный способ. OnPush работает с ними автоматически.',
  },
  {
    title: 'markForCheck() — редко',
    description: 'Только если данные пришли вне Angular Zone. Подробный пример — на странице ChangeDetectorRef (/cdr).',
  },
  {
    title: 'События в шаблоне',
    description: 'Клик (click) в шаблоне OnPush-компонента запускает проверку этого компонента и его детей.',
  },
];
