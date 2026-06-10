import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';

/**
 * Пример из документации Angular: OnPush + setInterval.
 * Данные меняются вне шаблонных событий — без markForCheck() UI не обновился бы.
 */
@Component({
  selector: 'app-cdr-mark-for-check-ticks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mark-for-check-ticks.html',
  styleUrl: './mark-for-check-ticks.scss',
})
export class CdrMarkForCheckTicks implements OnInit {
  numberOfTicks = 0;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.numberOfTicks++;

      // OnPush не проверяется автоматически после setInterval —
      // явно помечаем компонент для следующего цикла CD.
      this.cdr.markForCheck();
    }, 3000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }
}
