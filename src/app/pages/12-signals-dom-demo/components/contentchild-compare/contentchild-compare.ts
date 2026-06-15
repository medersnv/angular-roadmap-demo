import { AfterContentInit, Component, ContentChild, ElementRef, computed, contentChild, signal } from '@angular/core';

/** Раньше: @ContentChild читаем в ngAfterContentInit, при смене проекции — заново. */
@Component({
  selector: 'app-legacy-panel-box',
  template: `
    <div class="content-host"><ng-content /></div>
    <p class="metric">заголовок: <strong>{{ text() }}</strong></p>
    <div class="controls">
      <button type="button" class="btn" (click)="recheck()">перечитать</button>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class LegacyPanelBox implements AfterContentInit {
  @ContentChild('cTitle') private titleEl?: ElementRef<HTMLElement>;
  protected readonly text = signal('—');

  ngAfterContentInit(): void {
    this.recheck();
  }

  protected recheck(): void {
    this.text.set(this.titleEl?.nativeElement.textContent?.trim() ?? '—');
  }
}

/** Сейчас: contentChild() — сигнал, computed обновляется сам. */
@Component({
  selector: 'app-signal-panel-box',
  template: `
    <div class="content-host"><ng-content /></div>
    <p class="metric">заголовок: <strong>{{ text() }}</strong></p>
    <p class="hint">обновляется автоматически</p>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class SignalPanelBox {
  private readonly titleEl = contentChild<ElementRef<HTMLElement>>('cTitle');
  protected readonly text = computed(() => this.titleEl()?.nativeElement.textContent?.trim() ?? '—');
}

/** Переключаем наличие #cTitle в проекции обеих обёрток. */
@Component({
  selector: 'app-contentchild-compare',
  imports: [LegacyPanelBox, SignalPanelBox],
  template: `
    <div class="controls">
      <button type="button" class="btn" (click)="toggle()">
        {{ showTitle() ? 'убрать' : 'вернуть' }} #cTitle в проекции
      </button>
    </div>
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> @ContentChild</h4>
        <app-legacy-panel-box>
          @if (showTitle()) {
            <span #cTitle>Привет 👋</span>
          }
          <span class="hint">— тело панели —</span>
        </app-legacy-panel-box>
      </article>
      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> contentChild()</h4>
        <app-signal-panel-box>
          @if (showTitle()) {
            <span #cTitle>Привет 👋</span>
          }
          <span class="hint">— тело панели —</span>
        </app-signal-panel-box>
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class ContentchildCompare {
  protected readonly showTitle = signal(true);

  protected toggle(): void {
    this.showTitle.update((v) => !v);
  }
}
