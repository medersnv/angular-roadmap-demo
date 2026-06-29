import { Directive, ElementRef, HostListener, inject, input, OnDestroy } from '@angular/core';

/**
 * Простая standalone-директива tooltip.
 * Будет скомпозирована в CardButton через hostDirectives — без импорта в шаблоне.
 */
@Directive({ selector: '[appTooltip]' })
export class TooltipDirective implements OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly appTooltip = input('');

  private tip: HTMLElement | null = null;

  @HostListener('mouseenter')
  show(): void {
    const text = this.appTooltip();
    if (!text) return;

    const tip = document.createElement('div');
    tip.textContent = text;
    tip.style.cssText = [
      'position:fixed', 'z-index:9999',
      'background:#333', 'color:#fff',
      'font-size:0.72rem', 'padding:0.3rem 0.55rem',
      'border-radius:0.25rem', 'pointer-events:none',
      'white-space:nowrap',
    ].join(';');

    document.body.appendChild(tip);
    this.tip = tip;

    const r = this.el.nativeElement.getBoundingClientRect();
    tip.style.left = `${r.left + r.width / 2 - tip.offsetWidth / 2}px`;
    tip.style.top = `${r.top - tip.offsetHeight - 6}px`;
  }

  @HostListener('mouseleave')
  hide(): void {
    this.tip?.remove();
    this.tip = null;
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
