import { SignalMoment } from '../09-signals-basics-demo/signals-basics-info';

export type { SignalMoment };

export const SIGNALS_COMPONENTS_ESSENTIALS = [
  'input() заменяет @Input(): значение — сигнал, читается как count(), деривация через computed().',
  'input.required<T>() — вход обязателен, без значения по умолчанию (раньше — «!» и риск undefined).',
  'output() заменяет @Output() + EventEmitter: легче, не Observable, та же запись (changed)="..." в шаблоне.',
  'model() — двусторонний сигнал: одна строка вместо пары @Input value + @Output valueChange, включает [(value)].',
];

export const SIGNALS_COMPONENTS_MOMENTS: SignalMoment[] = [
  {
    id: 'input',
    title: '1. Входы: @Input() + ngOnChanges → input() + computed',
    desc: 'Раньше вход — обычное поле, а реакцию на его изменение писали в ngOnChanges. Сейчас вход — сигнал: производное считает computed(), реакция — effect(), lifecycle-хук не нужен.',
    beforeCode: `// Раньше
@Input() label!: string;   // «!» — обещаем, что придёт
@Input() count = 0;
doubled = 0;

ngOnChanges() {
  this.doubled = this.count * 2;   // пересчёт руками
}`,
    afterCode: `// Сейчас
label = input.required<string>(); // обязателен на уровне типов
count = input(0);
doubled = computed(() => this.count() * 2);

constructor() {
  effect(() => log(this.count())); // реакция без хука
}`,
    note: 'input() — readonly-сигнал: ребёнок не может писать в свой вход. input.required() даёт ошибку компиляции, если родитель забыл передать значение.',
  },
  {
    id: 'output',
    title: '2. Выходы: @Output() EventEmitter → output()',
    desc: 'output() — это лёгкая замена @Output() + new EventEmitter(). В шаблоне родителя ничего не меняется: тот же (picked)="...". Но это не RxJS-Observable, а специализированный эмиттер.',
    beforeCode: `// Раньше
@Output() picked = new EventEmitter<string>();

emit(value: string) {
  this.picked.emit(value);
}`,
    afterCode: `// Сейчас
picked = output<string>();

emit(value: string) {
  this.picked.emit(value);
}`,
    note: 'output() не нужно импортировать EventEmitter, он не Observable (нельзя .subscribe внутри) и автоматически завершается при уничтожении компонента.',
  },
  {
    id: 'model',
    title: '3. Двусторонняя привязка: пара Input/Output → model()',
    desc: 'Раньше для [(value)] держали @Input() value и @Output() valueChange и эмитили вручную. model() — один сигнал, который и читается, и пишется, и сразу поддерживает банан-в-коробке [(value)].',
    beforeCode: `// Раньше: ребёнок
@Input() value = 0;
@Output() valueChange = new EventEmitter<number>();
inc() { this.value++; this.valueChange.emit(this.value); }

// родитель
<child [value]="v()" (valueChange)="v.set($event)" />`,
    afterCode: `// Сейчас: ребёнок
value = model(0);
inc() { this.value.update(v => v + 1); }

// родитель
<child [(value)]="v" />`,
    note: 'model() сам эмитит изменение при value.set()/update(), поэтому [(value)] работает «из коробки». Родитель связывает сигнал напрямую.',
  },
];
