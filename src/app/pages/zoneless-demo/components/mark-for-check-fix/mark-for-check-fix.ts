import { ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';

/** markForCheck() после async — ручной триггер CD в zoneless. */
@Component({
  selector: 'app-zoneless-mark-for-check',
  templateUrl: './mark-for-check-fix.html',
  styleUrl: './mark-for-check-fix.scss',
})
export class ZonelessMarkForCheckFix {
  text = 'Начальное значение';

  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  runWithMark(): void {
    this.text = 'Жду 1 сек...';

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.text = 'Новое значение (markForCheck)';
        this.cdr.markForCheck();
      }, 1000);
    });
  }
}
