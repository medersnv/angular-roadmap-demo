import { Component, NgZone } from '@angular/core';

/** setTimeout в runOutsideAngular — UI не обновится, пока не будет события в Zone. */
@Component({
  selector: 'app-zone-outside-timer',
  templateUrl: './outside-zone-timer.html',
  styleUrl: './outside-zone-timer.scss',
})
export class ZoneOutsideTimer {
  text = 'Начальное значение';

  constructor(private readonly ngZone: NgZone) {}

  runOutside(): void {
    this.text = 'Жду 1 сек...';

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.text = 'Данные пришли (вне Zone)';
      }, 1000);
    });
  }
}
