import { Component, inject } from '@angular/core';
import { ClockService } from '../../services/demo-services';

@Component({
  selector: 'app-inject-field-panel',
  templateUrl: './inject-field-panel.html',
  styleUrl: '../constructor-panel/panel.scss',
})
export class InjectFieldPanel {
  protected time = '—';

  private readonly clock = inject(ClockService);

  onClick(): void {
    this.time = this.clock.now();
  }
}
