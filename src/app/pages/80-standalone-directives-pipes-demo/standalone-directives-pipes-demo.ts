import { Component, inject, signal } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { BadgeState } from './badge-state';
import { CallLog } from './call-log';
import { CardButton } from './components/card-button/card-button';
import { HighlightDirective } from './directives/highlight.directive';
import { FilterByPipe } from './pipes/filter.pipe';
import { ImpureFilterByPipe } from './pipes/impure-filter.pipe';
import { DIRECTIVES_PIPES_ESSENTIALS, DIRECTIVES_PIPES_MOMENTS } from './standalone-directives-pipes-info';

@Component({
  selector: 'app-standalone-directives-pipes-demo',
  imports: [HighlightDirective, FilterByPipe, ImpureFilterByPipe, CardButton],
  providers: [CallLog, BadgeState],
  templateUrl: './standalone-directives-pipes-demo.html',
  styleUrls: ['../shared/compare.scss', '../shared/widgets.scss'],
})
export class StandaloneDirectivesPipesDemo {
  protected readonly meta = getCurriculumItem('standalone-directives-pipes')!;
  protected readonly essentials = DIRECTIVES_PIPES_ESSENTIALS;
  protected readonly moments = DIRECTIVES_PIPES_MOMENTS;

  // --- Директива: цвет подсветки ---
  protected readonly colors = ['#fff3a0', '#b9f6ca', '#ff8a80', '#82b1ff'];
  protected readonly color = signal(this.colors[0]);

  // --- Пайп ---
  protected readonly callLog = inject(CallLog);
  protected readonly badgeState = inject(BadgeState);
  protected readonly fruits = signal([
    'Apple', 'Apricot', 'Banana', 'Cherry',
    'Grape', 'Mango', 'Orange', 'Peach',
  ]);
  protected readonly term = signal('');
  protected readonly badges = ['', '🔥', '✅', '⭐'];

  protected readonly pipeCode = `@Pipe({ name: 'filterBy' })   // pure: true по умолчанию
export class FilterByPipe implements PipeTransform {
  transform(list: string[], term: string): string[] {
    // знает только об аргументах — ничего больше
    const q = term.trim().toLowerCase();
    return q
      ? list.filter(i => i.toLowerCase().includes(q))
      : [...list];
  }
}`;

  protected readonly impurePipeCode = `@Pipe({ name: 'impureFilterBy', pure: false })
export class ImpureFilterByPipe implements PipeTransform {
  // читает ВНЕШНЕЕ состояние через inject() — не аргумент
  private readonly state = inject(BadgeState);

  transform(list: string[], term: string): string[] {
    const badge = this.state.badge();  // <-- реагирует на смену badge
    const q = term.trim().toLowerCase();
    const filtered = q
      ? list.filter(i => i.toLowerCase().includes(q))
      : [...list];
    return badge ? filtered.map(i => \`\${badge} \${i}\`) : filtered;
  }
}`;

  // --- Directive Composition API ---
  protected readonly compositionBeforeCode = `// Раньше: нужно добавить директивы в шаблон вручную
@Component({
  selector: 'app-card-button',
  imports: [HighlightDirective, TooltipDirective],
  template: \`
    <button
      [appHighlight]="color"
      [appTooltip]="tip"
    >{{ label }}</button>
  \`,
})
export class CardButton {}
// шаблон знает о всех директивах — тесная связь`;

  protected readonly compositionAfterCode = `// Сейчас: hostDirectives — поведение встроено в компонент
@Component({
  selector: 'app-card-button',
  hostDirectives: [
    { directive: HighlightDirective, inputs: ['appHighlight'] },
    { directive: TooltipDirective,   inputs: ['appTooltip']   },
  ],
  template: \`
    <span>{{ icon() }}</span>
    <span>{{ label() }}</span>
  \`,
  // шаблон чист — ничего не знает о директивах
})
export class CardButton {
  readonly icon  = input('📦');
  readonly label = input('');
}

// Использование — директивные входы доступны снаружи:
// <app-card-button
//   appHighlight="#b9f6ca"
//   appTooltip="Открыть заказы"
//   label="Заказы" />`;

  protected readonly cards = [
    { icon: '📦', label: 'Заказы',    color: '#b9f6ca', tip: 'Открыть список заказов' },
    { icon: '👤', label: 'Профиль',   color: '#82b1ff', tip: 'Настройки аккаунта' },
    { icon: '⚙️', label: 'Настройки', color: '#fff3a0', tip: 'Системные параметры' },
    { icon: '🚀', label: 'Деплой',    color: '#ff8a80', tip: 'Запустить деплой' },
  ];

  protected onSearch(value: string): void {
    this.term.set(value);
  }

  protected setBadge(b: string): void {
    this.badgeState.badge.set(b);
    this.callLog.reset();
  }
}
