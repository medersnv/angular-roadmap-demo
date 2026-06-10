import { Component, NgZone } from '@angular/core';

/** Обычное поле + async вне Zone — UI не обновится (как в zoneless). */
@Component({
  selector: 'app-zoneless-no-trigger',
  templateUrl: './no-trigger.html',
  styleUrl: './no-trigger.scss',
})
export class ZonelessNoTrigger {
  text = 'Начальное значение';

  constructor(private readonly ngZone: NgZone) {}

  runAsync(): void {
    this.text = 'Жду 1 сек...';

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.text = 'Новое значение (без триггера)';
      }, 1000);
    });
  }
}
