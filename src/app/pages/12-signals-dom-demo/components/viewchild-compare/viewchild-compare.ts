import { AfterViewInit, Component, ElementRef, ViewChild, computed, signal, viewChild } from '@angular/core';

/** Слева @ViewChild + хук, справа viewChild()-сигнал. */
@Component({
  selector: 'app-viewchild-compare',
  template: `
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> @ViewChild + ngAfterViewInit</h4>
        <div class="controls">
          <button type="button" class="btn" (click)="toggleLegacy()">
            {{ showLegacy() ? 'скрыть' : 'показать' }} поле
          </button>
          <button type="button" class="btn" (click)="focusLegacy()" [disabled]="!showLegacy()">focus()</button>
          <button type="button" class="btn" (click)="recheckLegacy()">перечитать</button>
        </div>
        @if (showLegacy()) {
          <input #legacyBox class="field" type="text" placeholder="legacy input" />
        }
        <p class="metric">ссылка: <strong>{{ legacyRefState() }}</strong></p>
        <p class="hint">Спрячь поле — текст останется старым, пока не нажмёшь «перечитать».</p>
      </article>

      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> viewChild()</h4>
        <div class="controls">
          <button type="button" class="btn btn-accent" (click)="toggleSignal()">
            {{ showSignal() ? 'скрыть' : 'показать' }} поле
          </button>
          <button type="button" class="btn" (click)="focusSignal()" [disabled]="!present()">focus()</button>
        </div>
        @if (showSignal()) {
          <input #signalBox class="field" type="text" placeholder="signal input" />
        }
        <p class="metric">present() = <strong>{{ present() ? 'элемент есть' : 'нет' }}</strong></p>
        <p class="hint">present() — computed поверх viewChild(): реагирует на показ/скрытие сразу.</p>
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class ViewchildCompare implements AfterViewInit {
  // --- Раньше ---
  protected readonly showLegacy = signal(true);
  @ViewChild('legacyBox') private legacyBox?: ElementRef<HTMLInputElement>;
  protected readonly legacyRefState = signal('нет');

  ngAfterViewInit(): void {
    this.recheckLegacy();
  }

  protected toggleLegacy(): void {
    this.showLegacy.update((v) => !v);
  }

  protected focusLegacy(): void {
    this.legacyBox?.nativeElement.focus();
  }

  protected recheckLegacy(): void {
    this.legacyRefState.set(this.legacyBox ? 'есть' : 'нет');
  }

  // --- Сейчас ---
  protected readonly showSignal = signal(true);
  private readonly signalBox = viewChild<ElementRef<HTMLInputElement>>('signalBox');
  protected readonly present = computed(() => !!this.signalBox());

  protected toggleSignal(): void {
    this.showSignal.update((v) => !v);
  }

  protected focusSignal(): void {
    this.signalBox()?.nativeElement.focus();
  }
}
