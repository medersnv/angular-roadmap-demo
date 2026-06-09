import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-onpush-signal-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './onpush-signal-child.html',
  styleUrl: './child.scss',
})
export class OnpushSignalChild {
  count = signal(0);

  increment(): void {
    this.count.update(value => value + 1);
  }
}
