import { Component, EventEmitter, Output, output, signal } from '@angular/core';

/** Раньше: @Output() + new EventEmitter(). */
@Component({
  selector: 'app-legacy-output-child',
  template: `
    <p class="hint">@Output() picked = new EventEmitter&lt;string&gt;()</p>
    <div class="controls">
      @for (emoji of options; track emoji) {
        <button type="button" class="btn" (click)="picked.emit(emoji)">{{ emoji }}</button>
      }
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class LegacyOutputChild {
  protected readonly options = ['👍', '🔥', '🎉'];
  @Output() readonly picked = new EventEmitter<string>();
}

/** Сейчас: output(). */
@Component({
  selector: 'app-signal-output-child',
  template: `
    <p class="hint">picked = output&lt;string&gt;()</p>
    <div class="controls">
      @for (emoji of options; track emoji) {
        <button type="button" class="btn btn-accent" (click)="picked.emit(emoji)">{{ emoji }}</button>
      }
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class SignalOutputChild {
  protected readonly options = ['👍', '🔥', '🎉'];
  readonly picked = output<string>();
}

/** Родитель слушает оба выхода одинаково: (picked)="...". */
@Component({
  selector: 'app-output-compare',
  imports: [LegacyOutputChild, SignalOutputChild],
  template: `
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> @Output + EventEmitter</h4>
        <app-legacy-output-child (picked)="legacyLast.set($event)" />
        <p class="metric metric-lg">получено: <strong>{{ legacyLast() || '—' }}</strong></p>
      </article>
      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> output()</h4>
        <app-signal-output-child (picked)="signalLast.set($event)" />
        <p class="metric metric-lg">получено: <strong>{{ signalLast() || '—' }}</strong></p>
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class OutputCompare {
  protected readonly legacyLast = signal('');
  protected readonly signalLast = signal('');
}
