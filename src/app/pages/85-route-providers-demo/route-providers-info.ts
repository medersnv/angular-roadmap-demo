export interface CompareMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export const ROUTE_PROVIDERS_ESSENTIALS = [
  'providers на объекте Route создают инжектор, заскоупленный на эту ветку маршрутов.',
  'Сервис живёт, пока активна ветка: ушёл из неё — инстанс уничтожается со всем состоянием.',
  'Идеально для состояния фичи (черновик, фильтры, wizard): оно не «протекает» в остальное приложение.',
  'providedIn: root — это глобальный синглтон на всё время жизни приложения; выбирай осознанно.',
];

export const ROUTE_PROVIDERS_MOMENTS: CompareMoment[] = [
  {
    id: 'scope',
    title: '1. Где живёт сервис: root-синглтон → ветка роутов',
    desc: 'providedIn:root даёт один экземпляр на всё приложение. providers на роуте — отдельный экземпляр на каждый вход в ветку; при выходе он уничтожается.',
    beforeCode: `// Один экземпляр на всё приложение
@Injectable({ providedIn: 'root' })
export class WizardState {
  step = signal(1);
}
// состояние мастера живёт вечно и
// шарится между всеми, кто его внедрит`,
    afterCode: `// Экземпляр на ветку роутов
@Injectable() // без providedIn
export class WizardState {
  step = signal(1);
}

const routes: Routes = [{
  path: 'wizard',
  providers: [WizardState],   // scope = эта ветка
  loadChildren: () => import('./wizard.routes'),
}];`,
    note: 'Зашёл в /wizard — создался WizardState; ушёл — уничтожился. Вернулся — чистый новый экземпляр.',
  },
  {
    id: 'children',
    title: '2. Общий сервис на дочерние экраны фичи',
    desc: 'Сервис, объявленный на родительском роуте, виден всем дочерним. Это удобный «локальный стор» фичи: один на раздел, изолирован от остального приложения.',
    beforeCode: `// Раньше: либо глобальный синглтон,
// либо provider в каждом компоненте
@Component({ providers: [OrdersStore] }) // у каждого свой!
export class OrderList {}
@Component({ providers: [OrdersStore] }) // ещё один!
export class OrderDetails {}`,
    afterCode: `const ORDERS_ROUTES: Routes = [{
  path: '',
  providers: [OrdersStore],   // один на всю ветку
  children: [
    { path: '', component: OrderList },
    { path: ':id', component: OrderDetails },
  ],
}];
// OrderList и OrderDetails делят ОДИН OrdersStore`,
    note: 'Дочерние компоненты получают тот же экземпляр через DI — состояние списка и деталей синхронно, без глобального стора.',
  },
];
