import { Component, DestroyRef, inject, OnInit } from '@angular/core';

/** setInterval внутри Zone — CD запускается автоматически. */
@Component({
  selector: 'app-zone-inside-timer',
  templateUrl: './inside-zone-timer.html',
  styleUrl: './inside-zone-timer.scss',
})
export class ZoneInsideTimer implements OnInit {
  count = 0;

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.count++;
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }
}
