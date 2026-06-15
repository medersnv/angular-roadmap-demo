import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, computed, signal, viewChildren } from '@angular/core';

/** QueryList требует ручного пересчёта; viewChildren()-сигнал — нет. */
@Component({
  selector: 'app-viewchildren-compare',
  template: `
    <div class="controls">
      <button type="button" class="btn" (click)="add()">+ добавить</button>
      <button type="button" class="btn" (click)="remove()" [disabled]="items().length === 0">− удалить</button>
      <span class="hint">список общий для обеих панелей</span>
    </div>
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> QueryList</h4>
        <div class="controls">
          @for (it of items(); track it) {
            <span #litem class="pill pill-ok">#{{ it }}</span>
          }
        </div>
        <p class="metric metric-lg">в DOM: <strong>{{ legacyCount() }}</strong></p>
        <div class="controls">
          <button type="button" class="btn" (click)="recountLegacy()">пересчитать</button>
        </div>
        <p class="hint">Длина не следует за списком сама — нужна подписка на .changes или ручной пересчёт.</p>
      </article>

      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> viewChildren()</h4>
        <div class="controls">
          @for (it of items(); track it) {
            <span #sitem class="pill pill-ok">#{{ it }}</span>
          }
        </div>
        <p class="metric metric-lg">в DOM: <strong>{{ signalCount() }}</strong></p>
        <p class="hint">count = computed(() =&gt; items().length) — обновляется само.</p>
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class ViewchildrenCompare implements AfterViewInit {
  protected readonly items = signal<number[]>([1, 2, 3]);
  private nextId = 4;

  protected add(): void {
    this.items.update((list) => [...list, this.nextId++]);
  }

  protected remove(): void {
    this.items.update((list) => list.slice(0, -1));
  }

  // --- Раньше: QueryList + ручной пересчёт ---
  @ViewChildren('litem') private legacyItems?: QueryList<ElementRef>;
  protected readonly legacyCount = signal(0);

  ngAfterViewInit(): void {
    this.recountLegacy();
  }

  protected recountLegacy(): void {
    this.legacyCount.set(this.legacyItems?.length ?? 0);
  }

  // --- Сейчас: viewChildren()-сигнал ---
  private readonly signalItems = viewChildren<ElementRef>('sitem');
  protected readonly signalCount = computed(() => this.signalItems().length);
}
