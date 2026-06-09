import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

/** signal обновляется из setInterval — работает без Zone.js. */
@Component({
  selector: 'app-zoneless-signal-counter',
  templateUrl: './signal-counter.html',
  styleUrl: './signal-counter.scss',
})
export class ZonelessSignalCounter implements OnInit {
  count = signal(0);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.count.update((value) => value + 1);
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }
}
