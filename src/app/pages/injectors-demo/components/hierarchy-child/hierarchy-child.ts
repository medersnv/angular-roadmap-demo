import { Component, inject } from '@angular/core';
import { ScopeCounter } from '../../services/scope-counter';

@Component({
  selector: 'app-injector-hierarchy-child',
  templateUrl: './hierarchy-child.html',
  styleUrl: './hierarchy-child.scss',
})
export class InjectorHierarchyChild {
  protected last = '—';
  protected readonly scopeName: string;

  private readonly counter = inject(ScopeCounter);

  constructor() {
    this.scopeName = this.counter.scopeName;
  }

  onClick(): void {
    this.last = this.counter.tick();
  }
}
