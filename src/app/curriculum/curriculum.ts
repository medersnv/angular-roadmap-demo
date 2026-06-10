export interface CurriculumItem {
  path: string;
  label: string;
  /** Подзаголовок / направление внутри группы */
  subtitle: string;
  /** true — демо уже реализовано */
  ready?: boolean;
}

export interface CurriculumGroup {
  order: number;
  title: string;
  items: CurriculumItem[];
}

/** Единый источник правды: порядок групп и пунктов меню */
export const CURRICULUM: CurriculumGroup[] = [
  {
    order: 1,
    title: 'Angular Core Internals',
    items: [
      { path: 'lifecycle', label: 'Lifecycle Hooks', subtitle: 'Hooks', ready: true },
      { path: 'onpush', label: 'OnPush', subtitle: 'Change Detection', ready: true },
      { path: 'cdr', label: 'ChangeDetectorRef', subtitle: 'Change Detection', ready: true },
      { path: 'zoneless', label: 'Zoneless', subtitle: 'Change Detection', ready: true },
      { path: 'zone', label: 'Zone.js', subtitle: 'Zone.js', ready: true },
      { path: 'inject', label: 'inject()', subtitle: 'Dependency Injection', ready: true },
      { path: 'injectors', label: 'Injectors', subtitle: 'Dependency Injection', ready: true },
      { path: 'providers', label: 'Providers', subtitle: 'Dependency Injection', ready: true },
    ],
  },
  {
    order: 2,
    title: 'Signals (Modern Core)',
    items: [
      { path: 'signals-basics', label: 'Signal basics', subtitle: 'Основы реактивности' },
      { path: 'signals-advanced', label: 'Advanced primitives', subtitle: 'Продвинутые примитивы' },
      { path: 'signals-components', label: 'Component interaction', subtitle: 'Взаимодействие компонентов' },
      { path: 'signals-dom', label: 'DOM queries', subtitle: 'Запросы к DOM' },
      { path: 'signals-philosophy', label: 'Philosophy', subtitle: 'Философия' },
    ],
  },
  {
    order: 3,
    title: 'RxJS (Deep Dive)',
    items: [
      { path: 'rxjs-streams', label: 'Observables', subtitle: 'Классы и потоки' },
      { path: 'rxjs-switching', label: 'Switching operators', subtitle: 'Переключающие операторы' },
      { path: 'rxjs-combining', label: 'Combining operators', subtitle: 'Комбинирующие операторы' },
      { path: 'rxjs-memory-leaks', label: 'Memory leaks', subtitle: 'Утечки памяти' },
      { path: 'rxjs-theory', label: 'Theory', subtitle: 'Теория' },
    ],
  },
  {
    order: 4,
    title: 'Standalone Architecture',
    items: [
      { path: 'standalone-components', label: 'Standalone components', subtitle: 'Компоненты нового типа' },
      { path: 'standalone-routing', label: 'Routing & architecture', subtitle: 'Роутинг и архитектура' },
    ],
  },
  {
    order: 5,
    title: 'Routing (Advanced)',
    items: [
      { path: 'routing-guards-data', label: 'Guards & data', subtitle: 'Безопасность и данные' },
      { path: 'routing-custom', label: 'Customization', subtitle: 'Кастомизация' },
      { path: 'routing-ux', label: 'Advanced UX', subtitle: 'Продвинутый UX' },
    ],
  },
  {
    order: 6,
    title: 'State Management',
    items: [
      { path: 'state-local', label: 'Local state', subtitle: 'Локальный стейт' },
      { path: 'state-global', label: 'Global state', subtitle: 'Глобальный стейт' },
      { path: 'state-concepts', label: 'Concepts', subtitle: 'Концепты' },
    ],
  },
  {
    order: 7,
    title: 'Modern Control Flow',
    items: [
      { path: 'control-flow-core', label: '@if / @for / @switch', subtitle: 'Шаблоны' },
      { path: 'control-flow-advanced', label: '@let / @empty', subtitle: 'Шаблоны' },
    ],
  },
  {
    order: 8,
    title: 'Deferrable Views',
    items: [
      { path: 'defer-basics', label: '@defer loading', subtitle: 'Оптимизация' },
      { path: 'defer-triggers', label: 'Triggers & prefetch', subtitle: 'Оптимизация' },
    ],
  },
  {
    order: 9,
    title: 'Performance Optimization',
    items: [
      { path: 'perf-templates', label: 'Templates & rendering', subtitle: 'Шаблоны и рендеринг' },
      { path: 'perf-build', label: 'Build & analysis', subtitle: 'Сборка и анализ' },
    ],
  },
  {
    order: 10,
    title: 'Forms (Advanced)',
    items: [
      { path: 'forms-reactive', label: 'Reactive forms', subtitle: 'Реактивные формы' },
      { path: 'forms-custom', label: 'Custom controls', subtitle: 'Кастомные компоненты' },
    ],
  },
  {
    order: 11,
    title: 'Rendering / SSR',
    items: [
      { path: 'ssr-modern', label: 'Modern rendering', subtitle: 'Современный рендеринг' },
      { path: 'ssr-advanced', label: 'Advanced techniques', subtitle: 'Продвинутые техники' },
      { path: 'ssr-lifecycle', label: 'SSR lifecycle', subtitle: 'Жизненный цикл' },
    ],
  },
  {
    order: 12,
    title: 'Testing',
    items: [
      { path: 'testing-unit', label: 'Unit tests', subtitle: 'Модульные тесты' },
      { path: 'testing-runners', label: 'Test runners', subtitle: 'Тест-раннеры' },
      { path: 'testing-integration', label: 'Integration tests', subtitle: 'Интеграционные тесты' },
    ],
  },
  {
    order: 13,
    title: 'Architecture & Monorepos',
    items: [
      { path: 'arch-design', label: 'Design', subtitle: 'Проектирование' },
      { path: 'arch-scale', label: 'Scalability', subtitle: 'Масштабируемость' },
      { path: 'arch-patterns', label: 'Patterns', subtitle: 'Шаблоны' },
      { path: 'arch-relations', label: 'Module relations', subtitle: 'Связи' },
    ],
  },
  {
    order: 14,
    title: 'Design System',
    items: [
      { path: 'ds-foundation', label: 'Foundation', subtitle: 'Фундамент' },
      { path: 'ds-tools', label: 'Tools', subtitle: 'Инструменты' },
      { path: 'ds-custom', label: 'Customization', subtitle: 'Кастомизация' },
    ],
  },
  {
    order: 15,
    title: 'Frontend Setup & CI/CD',
    items: [
      { path: 'cicd-standards', label: 'Code standards', subtitle: 'Стандарты кода' },
      { path: 'cicd-api', label: 'API integration', subtitle: 'Интеграция API' },
      { path: 'cicd-infra', label: 'Infrastructure', subtitle: 'Инфраструктура' },
    ],
  },
  {
    order: 16,
    title: 'Performance Metrics',
    items: [
      { path: 'perf-metrics-ux', label: 'Browser UX', subtitle: 'Браузерный опыт' },
      { path: 'perf-metrics-monitoring', label: 'Monitoring', subtitle: 'Мониторинг' },
    ],
  },
  {
    order: 17,
    title: 'Client-Side Storage',
    items: [
      { path: 'storage-sync', label: 'Sync storage', subtitle: 'Синхронные хранилища' },
      { path: 'storage-async-db', label: 'Async databases', subtitle: 'Асинхронные базы' },
      { path: 'storage-libraries', label: 'Libraries', subtitle: 'Библиотеки' },
      { path: 'storage-network', label: 'Network storage', subtitle: 'Сетевые хранилища' },
      { path: 'storage-offline', label: 'Offline architecture', subtitle: 'Оффлайн архитектура' },
    ],
  },
  {
    order: 18,
    title: 'Storage Security',
    items: [
      { path: 'storage-security-basics', label: 'Security basics', subtitle: 'Безопасность' },
      { path: 'storage-security-limits', label: 'Limits', subtitle: 'Ограничения' },
      { path: 'storage-security-arch', label: 'Architecture', subtitle: 'Архитектура' },
      { path: 'storage-security-tools', label: 'Tools', subtitle: 'Инструменты' },
    ],
  },
  {
    order: 19,
    title: 'JavaScript Core',
    items: [
      { path: 'js-basics', label: 'Core mechanisms', subtitle: 'Базовые механизмы' },
      { path: 'js-memory', label: 'Memory', subtitle: 'Память' },
      { path: 'js-oop', label: 'OOP internals', subtitle: 'ООП под капотом' },
      { path: 'js-async', label: 'Async', subtitle: 'Асинхронность' },
    ],
  },
  {
    order: 20,
    title: 'Browser Rendering',
    items: [
      { path: 'browser-rendering-opt', label: 'Optimization', subtitle: 'Оптимизация' },
      { path: 'browser-rendering-perf', label: 'Performance', subtitle: 'Производительность' },
    ],
  },
  {
    order: 21,
    title: 'HTTP / Networking',
    items: [
      { path: 'http-protocol', label: 'HTTP protocol', subtitle: 'Протокол' },
      { path: 'http-browser', label: 'Browser network', subtitle: 'Браузерная сеть' },
    ],
  },
  {
    order: 22,
    title: 'Advanced Security',
    items: [
      { path: 'security-code', label: 'Code security', subtitle: 'Безопасность кода' },
      { path: 'security-auth', label: 'Auth patterns', subtitle: 'Паттерны авторизации' },
    ],
  },
  {
    order: 23,
    title: 'Observability & Debugging',
    items: [
      { path: 'observability-prod', label: 'Production', subtitle: 'Продакшен' },
    ],
  },
  {
    order: 24,
    title: 'API Design & Contracts',
    items: [
      { path: 'api-integration', label: 'Integration', subtitle: 'Интеграция' },
      { path: 'api-reliability', label: 'Reliability', subtitle: 'Надёжность' },
    ],
  },
  {
    order: 25,
    title: 'Web Components',
    items: [
      { path: 'web-components-standards', label: 'Standards', subtitle: 'Стандарты' },
    ],
  },
  {
    order: 26,
    title: 'Accessibility (A11y)',
    items: [
      { path: 'a11y-basics', label: 'Accessibility', subtitle: 'Доступность' },
    ],
  },
  {
    order: 27,
    title: 'Build Internals',
    items: [
      { path: 'build-internals', label: 'Build pipeline', subtitle: 'Сборка' },
    ],
  },
  {
    order: 28,
    title: 'AI-Native Dev',
    items: [
      { path: 'ai-native-dev', label: 'AI tools', subtitle: 'Инструменты' },
    ],
  },
  {
    order: 29,
    title: 'TypeScript (Advanced)',
    items: [
      { path: 'typescript-advanced', label: 'Strict typing', subtitle: 'Строгая типизация' },
    ],
  },
];

export interface DemoNavItem {
  path: string;
  label: string;
  subtitle: string;
  group: string;
  ready?: boolean;
}

export function flattenCurriculumToNavItems(): DemoNavItem[] {
  return CURRICULUM.flatMap((group) =>
    group.items.map((item) => ({
      path: item.path,
      label: item.label,
      subtitle: item.subtitle,
      group: `${group.order}. ${group.title}`,
      ready: item.ready,
    })),
  );
}

export interface CurriculumItemMeta extends CurriculumItem {
  topicOrder: number;
  groupOrder: number;
  groupTitle: string;
}

export function iterateCurriculumItems(): CurriculumItemMeta[] {
  let topicOrder = 0;

  return CURRICULUM.flatMap((group) =>
    group.items.map((item) => {
      topicOrder += 1;
      return {
        ...item,
        topicOrder,
        groupOrder: group.order,
        groupTitle: group.title,
      };
    }),
  );
}

export function pathToDemoFolder(path: string): string {
  const item = getCurriculumItem(path);
  if (!item) {
    return `${path}-demo`;
  }

  const num = String(item.topicOrder).padStart(2, '0');
  return `${num}-${path}-demo`;
}

export function pathToDemoClassName(path: string): string {
  const base = path
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  return `${base}Demo`;
}

export function getCurriculumItem(path: string): CurriculumItemMeta | undefined {
  return iterateCurriculumItems().find((entry) => entry.path === path);
}
