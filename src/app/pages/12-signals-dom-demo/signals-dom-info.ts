import { SignalMoment } from '../09-signals-basics-demo/signals-basics-info';

export type { SignalMoment };

export const SIGNALS_DOM_ESSENTIALS = [
  'viewChild() / contentChild() — это сигналы: значение появляется и обновляется реактивно, без ngAfterViewInit.',
  'Результат можно читать в computed() и effect() — больше не нужно ловить момент в lifecycle-хуках.',
  'viewChildren() возвращает сигнал со списком вместо QueryList + подписки на .changes.',
  'Запрос пустой, пока элемент не отрисован, → используйте guard (?.), либо viewChild.required().',
];

export const SIGNALS_DOM_MOMENTS: SignalMoment[] = [
  {
    id: 'viewchild',
    title: '1. Ссылка на элемент: @ViewChild + ngAfterViewInit → viewChild()',
    desc: 'Раньше элемент был доступен только после ngAfterViewInit, а реакцию на его появление ловили в хуках. viewChild() — сигнал: его читают computed() и effect(), момент «когда элемент готов» отслеживается сам.',
    beforeCode: `// Раньше
@ViewChild('box') box?: ElementRef<HTMLInputElement>;

ngAfterViewInit() {
  this.box?.nativeElement.focus(); // только в хуке
}`,
    afterCode: `// Сейчас
box = viewChild<ElementRef<HTMLInputElement>>('box');

// сигнал доступен в computed/effect, без хука
present = computed(() => !!this.box());
focus() { this.box()?.nativeElement.focus(); }`,
    note: 'viewChild() реактивен: при появлении/исчезновении элемента (через @if) сигнал обновляется сам. @ViewChild требует ngAfterViewChecked, чтобы это заметить.',
  },
  {
    id: 'viewchildren',
    title: '2. Список элементов: QueryList + .changes → viewChildren()',
    desc: 'Раньше за динамическим списком следили через QueryList и подписку на .changes. viewChildren() — это сигнал-массив, а его длину и производные считает обычный computed().',
    beforeCode: `// Раньше
@ViewChildren('item') items!: QueryList<ElementRef>;
count = 0;

ngAfterViewInit() {
  this.count = this.items.length;
  this.items.changes.subscribe(q => this.count = q.length);
}`,
    afterCode: `// Сейчас
items = viewChildren<ElementRef>('item');
count = computed(() => this.items().length);

// никаких подписок и отписок`,
    note: 'viewChildren() сам пересобирается при изменении @for-списка — count() обновляется реактивно, отписка не нужна.',
  },
  {
    id: 'contentchild',
    title: '3. Спроецированный контент: @ContentChild → contentChild()',
    desc: 'Раньше спроецированный (ng-content) элемент читали в ngAfterContentInit, а при смене проекции перечитывали вручную. contentChild() — сигнал, и computed() поверх него обновляется автоматически.',
    beforeCode: `// Раньше: компонент-обёртка
@ContentChild('cTitle') title?: ElementRef<HTMLElement>;
text = '';

ngAfterContentInit() {
  this.text = this.title?.nativeElement.textContent ?? '';
}
// сменилась проекция → перечитать руками`,
    afterCode: `// Сейчас
title = contentChild<ElementRef<HTMLElement>>('cTitle');

text = computed(() =>
  this.title()?.nativeElement.textContent?.trim() ?? '—');
// обновляется само, когда проекция меняется`,
    note: 'Сигнал реагирует на появление/исчезновение спроецированного элемента. Текст внутри одного и того же элемента — это уже DOM, не сигнал: его читаем при изменении запроса.',
  },
];
