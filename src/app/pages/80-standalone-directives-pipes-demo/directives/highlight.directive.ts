import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

/**
 * Standalone-директива: импортируется прямо в imports компонента.
 * Зависимости — через inject(), цвет — через signal-input с alias.
 */
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  /** <p [appHighlight]="'lime'"> — имя селектора служит входом */
  readonly color = input('#fff3a0', { alias: 'appHighlight' });

  @HostListener('mouseenter')
  onEnter(): void {
    this.el.nativeElement.style.background = this.color();
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.el.nativeElement.style.background = '';
  }
}
