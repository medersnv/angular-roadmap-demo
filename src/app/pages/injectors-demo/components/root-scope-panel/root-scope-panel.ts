import { Component, inject, input } from '@angular/core';
import { RootScopeService } from '../../services/scope-counter';

@Component({
  selector: 'app-root-scope-panel',
  templateUrl: './root-scope-panel.html',
  styleUrl: './panel.scss',
})
export class RootScopePanel {
  title = input('Root scope');

  protected last = '—';

  private readonly service = inject(RootScopeService);

  onClick(): void {
    this.last = this.service.tick();
  }
}
