import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-child',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './default-child.html',
  styleUrl: './child.scss',
})
export class DefaultChild {
  @Input() user = { name: 'Meder' };
}
