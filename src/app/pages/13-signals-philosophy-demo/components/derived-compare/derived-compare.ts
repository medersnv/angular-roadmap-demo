import { AsyncPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

/** Один и тот же total = a + b: через RxJS и через computed(). */
@Component({
  selector: 'app-derived-compare',
  imports: [AsyncPipe],
  template: `
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> RxJS combineLatest + async</h4>
        <p class="metric">a = <strong>{{ a$ | async }}</strong> · b = <strong>{{ b$ | async }}</strong></p>
        <p class="metric metric-lg">total = <strong>{{ total$ | async }}</strong></p>
        <div class="controls">
          <button type="button" class="btn" (click)="bump(a$, -1)">a −1</button>
          <button type="button" class="btn" (click)="bump(a$, 1)">a +1</button>
          <button type="button" class="btn" (click)="bump(b$, -1)">b −1</button>
          <button type="button" class="btn" (click)="bump(b$, 1)">b +1</button>
        </div>
        <p class="hint">Subjects + combineLatest + map, в шаблоне три async-пайпа.</p>
      </article>

      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> computed()</h4>
        <p class="metric">a = <strong>{{ a() }}</strong> · b = <strong>{{ b() }}</strong></p>
        <p class="metric metric-lg">total = <strong>{{ total() }}</strong></p>
        <div class="controls">
          <button type="button" class="btn btn-accent" (click)="bumpA(-1)">a −1</button>
          <button type="button" class="btn btn-accent" (click)="bumpA(1)">a +1</button>
          <button type="button" class="btn btn-accent" (click)="bumpB(-1)">b −1</button>
          <button type="button" class="btn btn-accent" (click)="bumpB(1)">b +1</button>
        </div>
        <p class="hint">Читаем total() напрямую — без подписок и async-пайпов.</p>
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class DerivedCompare {
  // --- Раньше: RxJS ---
  protected readonly a$ = new BehaviorSubject(2);
  protected readonly b$ = new BehaviorSubject(3);
  protected readonly total$ = combineLatest([this.a$, this.b$]).pipe(map(([a, b]) => a + b));

  protected bump(source: BehaviorSubject<number>, delta: number): void {
    source.next(source.value + delta);
  }

  // --- Сейчас: signals ---
  protected readonly a = signal(2);
  protected readonly b = signal(3);
  protected readonly total = computed(() => this.a() + this.b());

  protected bumpA(delta: number): void {
    this.a.update((v) => v + delta);
  }

  protected bumpB(delta: number): void {
    this.b.update((v) => v + delta);
  }
}
