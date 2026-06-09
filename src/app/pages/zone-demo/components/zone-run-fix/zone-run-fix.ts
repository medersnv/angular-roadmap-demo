import { Component, NgZone } from '@angular/core';

/** NgZone.run() внутри callback — возвращает обновление в Angular. */
@Component({
  selector: 'app-zone-run-fix',
  templateUrl: './zone-run-fix.html',
  styleUrl: './zone-run-fix.scss',
})
export class ZoneRunFix {
  text = 'Начальное значение';

  constructor(private readonly ngZone: NgZone) {}

  runOutsideThenFix(): void {
    this.text = 'Жду 1 сек...';

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.text = 'Данные пришли (NgZone.run)';
        });
      }, 1000);
    });
  }
}
