export interface InjectorExampleInfo {
  id: 'root' | 'hierarchy' | 'twins';
  title: string;
  description: string;
  hint: string;
  code: string;
}

export const INJECTORS_ESSENTIALS = [
  'Injector — контейнер зависимостей. У каждого компонента свой инжектор, дети наследуют цепочку вверх.',
  'providedIn: \'root\' — один экземпляр на всё приложение (root injector).',
  'providers: [...] на @Component — новый инжектор у компонента, отдельный экземпляр для этой ветки DOM.',
  'inject() / constructor ищут зависимость снизу вверх: свой инжектор → родитель → ... → root.',
];

export const INJECTORS_COMPARISON = [
  {
    scope: 'providedIn: \'root\'',
    instance: 'Один на всё приложение',
    when: 'Сервисы без состояния UI, API, store, утилиты',
  },
  {
    scope: 'providers на компоненте',
    instance: 'Свой экземпляр на каждый компонент',
    when: 'Локальное состояние формы, wizard-step, изоляция ветки дерева',
  },
];

export const INJECTORS_EXAMPLES: InjectorExampleInfo[] = [
  {
    id: 'root',
    title: '1. providedIn: \'root\'',
    description: 'Оба блока ниже используют один и тот же сервис — счётчик общий.',
    hint: 'Кликни в любом блоке — оба покажут одно и то же значение.',
    code: `@Injectable({ providedIn: 'root' })
export class RootScopeService { ... }

// любой компонент:
private readonly service = inject(RootScopeService);`,
  },
  {
    id: 'hierarchy',
    title: '2. Provider на родителе → child наследует',
    description: 'Parent создаёт ScopeCounter в своём providers. Child получает тот же экземпляр.',
    hint: 'Клик в Parent или Child — один счётчик, одна строка scope.',
    code: `@Component({
  providers: [
    { provide: ScopeCounter, useFactory: () => new ScopeCounter('Parent') },
  ],
})
export class InjectorParent {}

// Child — без providers, inject(ScopeCounter) → экземпляр Parent`,
  },
  {
    id: 'twins',
    title: '3. Два Parent = два инжектора',
    description: 'Одинаковый provider на двух компонентах — два независимых экземпляра.',
    hint: 'Кликай в Parent A и Parent B — счётчики не связаны.',
    code: `@Component({ providers: [ScopeCounterFactory('A')] })
export class ParentA {}

@Component({ providers: [ScopeCounterFactory('B')] })
export class ParentB {}`,
  },
];
