import { Component, DestroyRef, inject, NgZone, OnInit, signal } from '@angular/core';

/** Side-by-side: setInterval в Zone, вне Zone и через signal. */
@Component({
  selector: 'app-zone-vs-zoneless',
  templateUrl: './zone-vs-zoneless.html',
  styleUrl: './zone-vs-zoneless.scss',
})
export class ZoneVsZoneless implements OnInit {
  zoneCount = 0;
  zonelessPlainCount = 0;
  zonelessSignalCount = signal(0);

  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const zoneInterval = setInterval(() => {
      this.zoneCount++;
    }, 1000);

    this.ngZone.runOutsideAngular(() => {
      const outsideInterval = setInterval(() => {
        this.zonelessPlainCount++;
        this.zonelessSignalCount.update((value) => value + 1);
      }, 1000);

      this.destroyRef.onDestroy(() => clearInterval(outsideInterval));
    });

    this.destroyRef.onDestroy(() => clearInterval(zoneInterval));
  }
}
