import { ChangeDetectionStrategy, Component, ElementRef, Input, inject, input, signal } from '@angular/core';

// Вспышка = в этой ячейке только что выполнилась Change Detection (ngDoCheck).
// Используем Web Animations API напрямую — это чистая DOM-операция, не биндинг,
// поэтому она безопасна (не вызывает ExpressionChanged и не планирует новый CD).
const FLASH_KEYFRAMES: Keyframe[] = [
  { offset: 0, background: '#42a5f5', color: '#fff', boxShadow: '0 0 0 4px rgba(66,165,245,0.45)' },
  { offset: 1, background: '#ffffff', color: '#333', boxShadow: '0 0 0 0 rgba(66,165,245,0)' },
];
const FLASH_OPTIONS: KeyframeAnimationOptions = { duration: 650, easing: 'ease-out' };

function flashCheck(host: HTMLElement): void {
  host.animate(FLASH_KEYFRAMES, FLASH_OPTIONS);
}

// flashMarker() вызывается из шаблона и вспыхивает ТОЛЬКО когда Angular реально обновляет
// шаблон этой ячейки (refreshView). Возвращает константу '' — безопасно для checkNoChanges.
// Это точнее, чем ngDoCheck: тот срабатывает у OnPush-детей даже без обновления их шаблона.

/** Раньше: Default CD — шаблон обновляется при каждом проходе CD родителя. */
@Component({
  selector: 'app-default-cell',
  template: `<span class="cd-lbl">#{{ index }}</span><strong>{{ value }}</strong>{{ flashMarker() }}`,
  styleUrl: './cd-cell.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefaultCell {
  @Input() index = 0;
  @Input() value = 0;
  private readonly host = inject(ElementRef).nativeElement as HTMLElement;

  protected flashMarker(): string {
    flashCheck(this.host);
    return '';
  }
}

/** Сейчас: OnPush + сигнальный вход — шаблон обновляется только при изменении value(). */
@Component({
  selector: 'app-signal-cell',
  template: `<span class="cd-lbl">#{{ index() }}</span><strong>{{ value() }}</strong>{{ flashMarker() }}`,
  styleUrl: './cd-cell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalCell {
  readonly index = input(0);
  readonly value = input(0);
  private readonly host = inject(ElementRef).nativeElement as HTMLElement;

  protected flashMarker(): string {
    flashCheck(this.host);
    return '';
  }
}

/** Дерево с Default-ячейками: событие проверяет их все. */
@Component({
  selector: 'app-legacy-tree',
  imports: [DefaultCell],
  template: `
    <div class="controls">
      <button type="button" class="btn" (click)="bump()">+1 ячейке #{{ target }}</button>
      <button type="button" class="btn" (click)="tick()">тик (не менять данные)</button>
    </div>
    <div class="cd-grid">
      @for (v of values; track $index) {
        <app-default-cell [index]="$index + 1" [value]="v" />
      }
    </div>
  `,
  styleUrls: ['./cd-visualizer.scss', '../../../shared/compare.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyTree {
  protected readonly target = 3;
  protected values = [10, 20, 30, 40, 50, 60];
  private nonce = 0;

  protected bump(): void {
    this.values = this.values.map((v, i) => (i === this.target - 1 ? v + 1 : v));
  }

  protected tick(): void {
    this.nonce += 1; // данные не трогаем, но Default CD всё равно проверит все ячейки
  }
}

/** Дерево с OnPush+signal ячейками: событие проверяет только изменившуюся. */
@Component({
  selector: 'app-signals-tree',
  imports: [SignalCell],
  template: `
    <div class="controls">
      <button type="button" class="btn btn-accent" (click)="bump()">+1 ячейке #{{ target }}</button>
      <button type="button" class="btn" (click)="tick()">тик (не менять данные)</button>
    </div>
    <div class="cd-grid">
      @for (s of values; track $index) {
        <app-signal-cell [index]="$index + 1" [value]="s()" />
      }
    </div>
  `,
  styleUrls: ['./cd-visualizer.scss', '../../../shared/compare.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsTree {
  protected readonly target = 3;
  protected readonly values = [10, 20, 30, 40, 50, 60].map((v) => signal(v));
  private readonly nonce = signal(0);

  protected bump(): void {
    this.values[this.target - 1].update((v) => v + 1);
  }

  protected tick(): void {
    this.nonce.update((n) => n + 1); // сигнал, который ячейки не читают → они не вспыхнут
  }
}

/** Две панели рядом: Default CD против OnPush + signals. */
@Component({
  selector: 'app-cd-visualizer',
  imports: [LegacyTree, SignalsTree],
  template: `
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Без сигналов</span> Default CD</h4>
        <p class="hint">Проверяется ВСЁ поддерево при любом событии.</p>
        <app-legacy-tree />
        <p class="hint">«+1 #3» и даже «тик» заставляют вспыхнуть все 6 ячеек.</p>
      </article>
      <article class="panel panel-after">
        <h4><span class="tag tag-after">С сигналами</span> OnPush + signal</h4>
        <p class="hint">Проверяется ТОЛЬКО изменившийся узел.</p>
        <app-signals-tree />
        <p class="hint">«+1 #3» вспыхивает только ячейку #3; «тик» — ничего.</p>
      </article>
    </div>
  `,
  styleUrls: ['./cd-visualizer.scss', '../../../shared/compare.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdVisualizer {}
