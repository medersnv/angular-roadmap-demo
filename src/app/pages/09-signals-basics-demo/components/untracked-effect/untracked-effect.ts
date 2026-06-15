import { Component, effect, signal, untracked } from '@angular/core';

/** Два эффекта на те же сигналы: один отслеживает clicks, другой читает его через untracked(). */
@Component({
  selector: 'app-untracked-effect',
  templateUrl: './untracked-effect.html',
  styleUrl: '../../../shared/compare.scss',
})
export class UntrackedEffect {
  private readonly users = ['Анна', 'Борис', 'Вера'];
  protected readonly user = signal('Анна');
  protected readonly clicks = signal(0);

  protected readonly trackedLog = signal<string[]>([]);
  protected readonly untrackedLog = signal<string[]>([]);

  constructor() {
    // Наивно: оба сигнала отслеживаются
    effect(() => {
      const entry = `${this.user()} · clicks=${this.clicks()}`;
      this.trackedLog.update((lines) => [entry, ...lines].slice(0, 6));
    });

    // untracked: clicks читается без подписки
    effect(() => {
      const u = this.user();
      const c = untracked(() => this.clicks());
      this.untrackedLog.update((lines) => [`${u} · clicks=${c}`, ...lines].slice(0, 6));
    });
  }

  protected changeUser(): void {
    const next = (this.users.indexOf(this.user()) + 1) % this.users.length;
    this.user.set(this.users[next]);
  }

  protected addClick(): void {
    this.clicks.update((v) => v + 1);
  }
}
