import { Component, DestroyRef, effect, inject, signal } from '@angular/core';

interface Speed {
  label: string;
  ms: number;
}

/** Слева таймеры копятся при смене скорости; справа onCleanup чистит прежний. */
@Component({
  selector: 'app-effect-cleanup',
  templateUrl: './effect-cleanup.html',
  styleUrl: '../../../shared/compare.scss',
})
export class EffectCleanup {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly speeds: Speed[] = [
    { label: 'медленно', ms: 1000 },
    { label: 'средне', ms: 500 },
    { label: 'быстро', ms: 200 },
  ];

  // --- Раньше: без очистки при смене — таймеры копятся ---
  protected readonly legacyTicks = signal(0);
  protected readonly legacyTimers = signal(0);
  private readonly legacyIds: ReturnType<typeof setInterval>[] = [];

  protected legacySetSpeed(ms: number): void {
    const id = setInterval(() => this.legacyTicks.update((t) => t + 1), ms);
    this.legacyIds.push(id); // прежний не очистили
    this.legacyTimers.update((n) => n + 1);
  }

  // --- Сейчас: effect + onCleanup ---
  protected readonly speed = signal(1000);
  protected readonly ticks = signal(0);
  protected readonly runs = signal(0);

  constructor() {
    effect((onCleanup) => {
      const ms = this.speed();
      this.runs.update((r) => r + 1);
      const id = setInterval(() => this.ticks.update((t) => t + 1), ms);
      onCleanup(() => clearInterval(id));
    });

    // в реальном приложении legacy-таймеры тоже надо закрыть — хотя бы при уничтожении
    this.destroyRef.onDestroy(() => this.legacyIds.forEach((id) => clearInterval(id)));
  }

  protected setSpeed(ms: number): void {
    this.speed.set(ms);
  }
}
