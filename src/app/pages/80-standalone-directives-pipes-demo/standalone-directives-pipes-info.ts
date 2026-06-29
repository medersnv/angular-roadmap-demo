export interface CompareMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export const DIRECTIVES_PIPES_ESSENTIALS = [
  'Директивы и пайпы тоже бывают standalone: их импортируют прямо в imports компонента.',
  'Директива получает зависимости через inject() — конструктор с параметрами больше не обязателен.',
  'Pure-пайп (по умолчанию) пересчитывается только при смене входных аргументов → дешёвый и кэшируемый.',
  'Impure-пайп (pure: false) вызывается на каждом change detection — мощно, но дорого: применять осторожно.',
];

export const DIRECTIVES_PIPES_MOMENTS: CompareMoment[] = [
  {
    id: 'dir-declare',
    title: '1. Директива: declarations → standalone import',
    desc: 'Раньше атрибутивную директиву объявляли в модуле и тащили модуль повсюду. Standalone-директива импортируется напрямую в тот компонент, где нужна.',
    beforeCode: `@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {}

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective],
})
export class UiModule {}   // модуль ради одной директивы`,
    afterCode: `@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {}

@Component({
  selector: 'app-box',
  imports: [HighlightDirective],  // напрямую
  template: '<p appHighlight>наведи на меня</p>',
})
export class Box {}`,
  },
  {
    id: 'dir-inject',
    title: '2. Зависимости директивы: конструктор → inject()',
    desc: 'inject() читает зависимости из текущего инжектора без «портянки» в конструкторе. ElementRef, Renderer2, родительские директивы — всё доступно через inject().',
    beforeCode: `@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  constructor(
    private el: ElementRef,
    private r: Renderer2,
  ) {}

  @HostListener('mouseenter') on() {
    this.r.setStyle(this.el.nativeElement,
      'background', 'gold');
  }
}`,
    afterCode: `@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  private readonly el = inject(ElementRef);
  readonly color = input('gold', { alias: 'appHighlight' });

  @HostListener('mouseenter') on() {
    this.el.nativeElement.style.background = this.color();
  }
  @HostListener('mouseleave') off() {
    this.el.nativeElement.style.background = '';
  }
}`,
    note: "input() с alias позволяет писать [appHighlight]=\"'lime'\": имя селектора = имя входа. inject() работает и в директивах, и в пайпах, и в сервисах.",
  },
  {
    id: 'pipe-declare',
    title: '3. Пайп: declarations → standalone import',
    desc: 'Пайп тоже самодостаточен. Объявляем класс с @Pipe и импортируем в компонент — никакого модуля-обёртки.',
    beforeCode: `@Pipe({ name: 'filterBy' })
export class FilterByPipe implements PipeTransform {
  transform(list: Item[], term: string) { /* ... */ }
}

@NgModule({
  declarations: [FilterByPipe],
  exports: [FilterByPipe],
})
export class PipesModule {}`,
    afterCode: `@Pipe({ name: 'filterBy' })   // pure по умолчанию
export class FilterByPipe implements PipeTransform {
  transform(list: Item[], term: string) { /* ... */ }
}

@Component({
  imports: [FilterByPipe],
  template: '@for (i of items() | filterBy: term(); ...)',
})
export class List {}`,
  },
  {
    id: 'pure',
    title: '4. Pure vs impure: кэш против каждого тика',
    desc: 'Pure-пайп Angular вызывает только когда меняется ссылка на аргумент. Impure (pure: false) — на каждый change detection. Внизу живой счётчик показывает разницу: «не относящийся тик» НЕ дёргает pure-пайп.',
    beforeCode: `// impure: вызывается на КАЖДЫЙ change detection
@Pipe({ name: 'filterBy', pure: false })
export class FilterByPipe {
  transform(list, term) {
    // дёргается постоянно — даже когда
    // ни list, ни term не менялись
  }
}`,
    afterCode: `// pure (по умолчанию): только при смене аргументов
@Pipe({ name: 'filterBy' })
export class FilterByPipe {
  transform(list, term) {
    // вызовется лишь когда изменится
    // ссылка на list или значение term
  }
}`,
    note: 'Pure-пайп = чистая функция: те же входы → тот же результат, можно кэшировать. Для фильтра/сортировки по изменяемому массиву либо создавай новый массив (новая ссылка), либо считай в computed().',
  },
];
