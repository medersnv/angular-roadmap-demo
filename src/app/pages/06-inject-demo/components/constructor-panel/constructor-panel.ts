import { Component } from '@angular/core';
import { ClockService } from '../../services/demo-services';

@Component({
  selector: 'app-constructor-panel',
  templateUrl: './constructor-panel.html',
  styleUrl: './panel.scss',
})
export class ConstructorPanel {
  protected time = '—';

  constructor(private readonly clock: ClockService) {}

  onClick(): void {
    this.time = this.clock.now();
  }
}
