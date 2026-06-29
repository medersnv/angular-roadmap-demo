export interface CodeSnippet {
  title: string;
  code: string;
}

export interface LayerNode {
  id: string;
  label: string;
  layer: 'feature' | 'shared' | 'core';
}

export const FEATURE_ESSENTIALS = [
  'core/ — синглтоны и инфраструктура (auth, http-интерсепторы, конфиг): подключается один раз.',
  'shared/ — переиспользуемые «глупые» компоненты, директивы, пайпы без знания о фичах.',
  'features/<feature>/ — самодостаточные разделы: свои страницы, сервисы и роуты.',
  'Граница фичи = граница lazy-чанка: каждая features/* грузится через loadChildren отдельно.',
];

export const FEATURE_TREE = `src/app/
├── core/                 # один раз на приложение
│   ├── auth/             #   AuthStore, authGuard
│   ├── http/             #   интерсепторы
│   └── config/
├── shared/               # переиспользуемое, без бизнес-логики
│   ├── ui/               #   button, card, modal
│   ├── directives/
│   └── pipes/
├── features/             # ← каждая папка = lazy-чанк
│   ├── orders/
│   │   ├── orders.routes.ts
│   │   ├── pages/
│   │   └── data/         #   orders.service.ts
│   └── catalog/
│       ├── catalog.routes.ts
│       └── pages/
└── app.routes.ts         # связывает фичи лениво`;

export const FEATURE_SNIPPETS: CodeSnippet[] = [
  {
    title: 'app.routes.ts — фичи подключены лениво',
    code: `export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.routes'),
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./features/catalog/catalog.routes'),
  },
];`,
  },
  {
    title: 'features/orders/orders.routes.ts — фича замкнута в себе',
    code: `export default [
  { path: '', component: OrderList },
  { path: ':id', component: OrderDetails },
] satisfies Routes;
// сервисы, страницы и роуты orders живут только тут
// и попадают в свой чанк`,
  },
];
