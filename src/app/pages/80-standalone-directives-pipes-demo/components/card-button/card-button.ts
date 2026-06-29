import { Component, input } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';

/**
 * Кнопка-карточка с поведением через Directive Composition API.
 *
 * hostDirectives встраивает HighlightDirective и TooltipDirective в хост-элемент.
 * Алиасы (cardColor, cardTooltip) нужны, чтобы внешний атрибут не совпадал
 * с селектором директивы [appHighlight] — иначе Angular применит директиву
 * дважды (NG0309). Те же имена объявлены как input() — для шаблонного компилятора.
 */
@Component({
  selector: 'app-card-button',
  hostDirectives: [
    { directive: HighlightDirective, inputs: ['appHighlight: cardColor'] },
    { directive: TooltipDirective,   inputs: ['appTooltip: cardTooltip'] },
  ],
  template: `
    <span class="card-icon">{{ icon() }}</span>
    <span class="card-label">{{ label() }}</span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 0.9rem;
      border: 1px solid #e0e0e0;
      border-radius: 0.5rem;
      background: #fff;
      cursor: pointer;
      font-size: 0.85rem;
      transition: box-shadow 0.15s;
      user-select: none;
    }
    :host:hover { box-shadow: 0 2px 6px #0001; }
    .card-icon { font-size: 1.1rem; }
  `],
})
export class CardButton {
  readonly icon = input('📦');
  readonly label = input('');
  // Объявляем алиасы явно — шаблонный компилятор видит их как входы компонента.
  // Реальную работу делает hostDirective: эти поля только для типизации.
  readonly cardColor   = input('');
  readonly cardTooltip = input('');
}
