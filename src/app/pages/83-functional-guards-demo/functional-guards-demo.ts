import { Component, inject, signal } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { AuthStore } from './auth-store';
import { GUARDS_ESSENTIALS, GUARDS_MOMENTS } from './functional-guards-info';

interface GuardedRoute {
  path: string;
  title: string;
  needsAdmin: boolean;
}

@Component({
  selector: 'app-functional-guards-demo',
  providers: [AuthStore],
  templateUrl: './functional-guards-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class FunctionalGuardsDemo {
  protected readonly meta = getCurriculumItem('functional-guards')!;
  protected readonly essentials = GUARDS_ESSENTIALS;
  protected readonly moments = GUARDS_MOMENTS;
  protected readonly auth = inject(AuthStore);

  protected readonly targets: GuardedRoute[] = [
    { path: '/dashboard', title: 'Dashboard', needsAdmin: false },
    { path: '/admin', title: 'Admin panel', needsAdmin: true },
  ];

  protected readonly outcome = signal<{ ok: boolean; text: string } | null>(null);
  protected readonly current = signal<string | null>(null);

  /** Повторяет логику authGuard + roleGuard('admin'). */
  protected go(route: GuardedRoute): void {
    if (!this.auth.isLoggedIn()) {
      this.current.set(null);
      this.outcome.set({
        ok: false,
        text: `⛔ authGuard: гость → createUrlTree(['/login'], { returnUrl: '${route.path}' })`,
      });
      return;
    }

    if (route.needsAdmin && !this.auth.hasRole('admin')) {
      this.current.set(null);
      this.outcome.set({
        ok: false,
        text: `⛔ roleGuard('admin'): роль «${this.auth.role()}» → редирект на /403`,
      });
      return;
    }

    this.current.set(route.path);
    this.outcome.set({ ok: true, text: `✅ Гварды пройдены → открыт ${route.path}` });
  }
}
