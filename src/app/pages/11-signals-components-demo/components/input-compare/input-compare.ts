import { Component, EventEmitter, Input, OnChanges, computed, effect, input, signal } from '@angular/core';

/** Раньше: @Input() + ngOnChanges для деривации и реакции. */
@Component({
  selector: 'app-legacy-input-child',
  template: `
    <p class="metric">label = <strong>{{ label }}</strong></p>
    <p class="metric">count = <strong>{{ count }}</strong> · doubled = <strong>{{ doubled }}</strong></p>
    <div class="log">
      @for (line of changes; track $index) {
        <div class="log-line">ngOnChanges: {{ line }}</div>
      } @empty {
        <div class="log-line">— ждём изменений —</div>
      }
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class LegacyInputChild implements OnChanges {
  @Input() label = '';
  @Input() count = 0;
  protected doubled = 0;
  protected changes: string[] = [];

  ngOnChanges(): void {
    this.doubled = this.count * 2; // пересчитываем руками
    this.changes = [`count=${this.count}`, ...this.changes].slice(0, 5);
  }
}

/** Сейчас: input() / input.required() + computed + effect. */
@Component({
  selector: 'app-signal-input-child',
  template: `
    <p class="metric">label = <strong>{{ label() }}</strong></p>
    <p class="metric">count = <strong>{{ count() }}</strong> · doubled = <strong>{{ doubled() }}</strong></p>
    <div class="log">
      @for (line of changes(); track $index) {
        <div class="log-line">effect: {{ line }}</div>
      } @empty {
        <div class="log-line">— ждём изменений —</div>
      }
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class SignalInputChild {
  readonly label = input.required<string>();
  readonly count = input(0);
  protected readonly doubled = computed(() => this.count() * 2);
  protected readonly changes = signal<string[]>([]);

  constructor() {
    effect(() => {
      const current = this.count();
      this.changes.update((lines) => [`count=${current}`, ...lines].slice(0, 5));
    });
  }
}

/** Оба ребёнка получают одни и те же входы из родителя. */
@Component({
  selector: 'app-input-compare',
  imports: [LegacyInputChild, SignalInputChild],
  template: `
    <div class="controls">
      <input
        class="field"
        type="text"
        placeholder="label"
        [value]="label()"
        (input)="label.set($any($event.target).value)"
      />
      <button type="button" class="btn" (click)="dec()">−1</button>
      <button type="button" class="btn" (click)="inc()">+1 count</button>
      <span class="hint">меняем входы → оба ребёнка реагируют</span>
    </div>
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> @Input + ngOnChanges</h4>
        <app-legacy-input-child [label]="label()" [count]="count()" />
      </article>
      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> input() + computed</h4>
        <app-signal-input-child [label]="label()" [count]="count()" />
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class InputCompare {
  protected readonly label = signal('Товар');
  protected readonly count = signal(1);

  protected inc(): void {
    this.count.update((v) => v + 1);
  }

  protected dec(): void {
    this.count.update((v) => v - 1);
  }
}
