import { Component, inject } from '@angular/core';
import { createScopeCounter, ScopeCounter } from '../../services/scope-counter';

@Component({
  selector: 'app-injector-twin-a',
  providers: [{ provide: ScopeCounter, useFactory: () => createScopeCounter('Parent A') }],
  templateUrl: './twin-parent.html',
  styleUrl: '../root-scope-panel/panel.scss',
})
export class InjectorTwinA {
  protected readonly title = 'Parent A';
  protected last = '—';

  private readonly counter = inject(ScopeCounter);

  onClick(): void {
    this.last = this.counter.tick();
  }
}

@Component({
  selector: 'app-injector-twin-b',
  providers: [{ provide: ScopeCounter, useFactory: () => createScopeCounter('Parent B') }],
  templateUrl: './twin-parent.html',
  styleUrl: '../root-scope-panel/panel.scss',
})
export class InjectorTwinB {
  protected readonly title = 'Parent B';
  protected last = '—';

  private readonly counter = inject(ScopeCounter);

  onClick(): void {
    this.last = this.counter.tick();
  }
}
