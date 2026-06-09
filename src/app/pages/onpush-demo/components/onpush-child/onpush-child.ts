import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';

@Component({
  selector: 'app-onpush-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './onpush-child.html',
  styleUrl: './child.scss',
})
export class OnpushChild {
  @Input() user = { name: 'Meder' };

  localClicks = 0;

  private readonly cdr = inject(ChangeDetectorRef);

  onLocalClick(): void {
    this.localClicks++;
  }

  /** Принудительно помечает компонент для проверки — подхватит мутацию @Input от родителя. */
  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
