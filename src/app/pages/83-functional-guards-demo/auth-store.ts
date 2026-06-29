import { computed, Injectable, signal } from '@angular/core';

/** Мини-сервис авторизации на сигналах — его читают гварды через inject(). */
@Injectable()
export class AuthStore {
  readonly loggedIn = signal(false);
  readonly role = signal<'user' | 'admin'>('user');

  readonly label = computed(() =>
    this.loggedIn() ? `вошёл как ${this.role()}` : 'гость',
  );

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  hasRole(role: 'user' | 'admin'): boolean {
    return this.loggedIn() && (this.role() === role || this.role() === 'admin');
  }

  login(role: 'user' | 'admin'): void {
    this.loggedIn.set(true);
    this.role.set(role);
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
