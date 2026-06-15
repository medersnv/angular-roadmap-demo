import { Component, EventEmitter, Input, Output, model, signal } from '@angular/core';

/** Раньше: ручная пара @Input value + @Output valueChange. */
@Component({
  selector: 'app-legacy-model-child',
  template: `
    <div class="controls">
      <button type="button" class="btn" (click)="dec()">−</button>
      <strong>{{ value }}</strong>
      <button type="button" class="btn" (click)="inc()">+</button>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class LegacyModelChild {
  @Input() value = 0;
  @Output() readonly valueChange = new EventEmitter<number>();

  inc(): void {
    this.value++;
    this.valueChange.emit(this.value);
  }

  dec(): void {
    this.value--;
    this.valueChange.emit(this.value);
  }
}

/** Сейчас: model() — один двусторонний сигнал. */
@Component({
  selector: 'app-signal-model-child',
  template: `
    <div class="controls">
      <button type="button" class="btn btn-accent" (click)="dec()">−</button>
      <strong>{{ value() }}</strong>
      <button type="button" class="btn btn-accent" (click)="inc()">+</button>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class SignalModelChild {
  readonly value = model(0);

  inc(): void {
    this.value.update((v) => v + 1);
  }

  dec(): void {
    this.value.update((v) => v - 1);
  }
}

/** Слева — ручная банан-в-коробке, справа — [(value)] через model(). */
@Component({
  selector: 'app-model-compare',
  imports: [LegacyModelChild, SignalModelChild],
  template: `
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> [value] + (valueChange)</h4>
        <app-legacy-model-child [value]="legacyVal()" (valueChange)="legacyVal.set($event)" />
        <p class="metric">родитель видит: <strong>{{ legacyVal() }}</strong></p>
        <div class="controls">
          <button type="button" class="btn" (click)="legacyVal.set(0)">сброс из родителя</button>
        </div>
      </article>
      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> [(value)] + model()</h4>
        <app-signal-model-child [(value)]="modelVal" />
        <p class="metric">родитель видит: <strong>{{ modelVal() }}</strong></p>
        <div class="controls">
          <button type="button" class="btn" (click)="modelVal.set(0)">сброс из родителя</button>
        </div>
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class ModelCompare {
  protected readonly legacyVal = signal(5);
  protected readonly modelVal = signal(5);
}
