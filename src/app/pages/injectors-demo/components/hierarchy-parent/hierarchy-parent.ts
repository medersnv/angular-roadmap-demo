import { Component, inject } from '@angular/core';
import { createScopeCounter, ScopeCounter } from '../../services/scope-counter';
import { InjectorHierarchyChild } from '../hierarchy-child/hierarchy-child';

@Component({
  selector: 'app-injector-hierarchy-parent',
  imports: [InjectorHierarchyChild],
  providers: [{ provide: ScopeCounter, useFactory: () => createScopeCounter('Parent injector') }],
  templateUrl: './hierarchy-parent.html',
  styleUrl: '../root-scope-panel/panel.scss',
})
export class InjectorHierarchyParent {
  protected last = '—';

  private readonly counter = inject(ScopeCounter);

  onClick(): void {
    this.last = this.counter.tick();
  }
}
