export interface CompareMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export const LAZY_ESSENTIALS = [
  'loadComponent — лениво грузит ОДИН standalone-компонент как отдельный чанк.',
  'loadChildren теперь может вернуть массив Routes напрямую — без промежуточного NgModule.',
  'Роутер сам разворачивает default-экспорт: можно не писать .then(m => m.Xxx).',
  'Граница lazy-чанка = граница фичи: каждый раздел грузится только когда в него заходят.',
];

export const LAZY_MOMENTS: CompareMoment[] = [
  {
    id: 'component',
    title: '1. Один экран: loadChildren(Module) → loadComponent',
    desc: 'Раньше даже ради одного экрана заводили lazy-модуль с собственным роутингом. Теперь standalone-компонент грузится напрямую через loadComponent.',
    beforeCode: `// Раньше: модуль ради одного экрана
const routes: Routes = [{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module')
    .then(m => m.ProfileModule),
}];

@NgModule({
  declarations: [ProfilePage],
  imports: [RouterModule.forChild([
    { path: '', component: ProfilePage },
  ])],
})
export class ProfileModule {}`,
    afterCode: `// Сейчас: грузим сам компонент
const routes: Routes = [{
  path: 'profile',
  loadComponent: () => import('./profile/profile')
    .then(m => m.Profile),
}];

// profile.ts — обычный standalone-компонент,
// никакого ProfileModule больше нет`,
    note: 'loadComponent создаёт отдельный чанк для одного компонента — идеально для самостоятельных экранов.',
  },
  {
    id: 'children',
    title: '2. Раздел из нескольких экранов: loadChildren → Routes[]',
    desc: 'Для целой фичи loadChildren остаётся, но возвращает массив Routes, а не NgModule. Дочерние компоненты — тоже standalone и тоже могут грузиться лениво.',
    beforeCode: `loadChildren: () =>
  import('./admin/admin.module')
    .then(m => m.AdminModule),

// admin.module.ts: @NgModule + RouterModule.forChild`,
    afterCode: `// admin.routes.ts
export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminHome },
  { path: 'users', component: UsersPage },
];

// в основном роутинге:
loadChildren: () =>
  import('./admin/admin.routes')
    .then(m => m.ADMIN_ROUTES),`,
    note: 'Вся фича — это файл с массивом Routes. Можно навешивать на ветку guard’ы и providers (см. соседние темы).',
  },
  {
    id: 'default',
    title: '3. Сахар: автo-разворачивание default-экспорта',
    desc: 'Если модуль роутов или компонент экспортирован как default, роутер развернёт его сам — .then(...) можно опустить.',
    beforeCode: `// Явно достаём именованный экспорт
loadComponent: () =>
  import('./profile/profile')
    .then(m => m.Profile),

loadChildren: () =>
  import('./admin/admin.routes')
    .then(m => m.ADMIN_ROUTES),`,
    afterCode: `// profile.ts:  export default class Profile {}
loadComponent: () => import('./profile/profile'),

// admin.routes.ts: export default [ ... ] satisfies Routes
loadChildren: () => import('./admin/admin.routes'),`,
    note: 'Меньше шаблонного кода. Многие проекты оставляют именованные экспорты ради явности — это вопрос стиля.',
  },
];
