import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClockService {
  private ticks = 0;

  now(): string {
    this.ticks++;
    const time = new Date().toLocaleTimeString();
    return `#${this.ticks} — ${time}`;
  }
}

@Injectable({ providedIn: 'root' })
export class   AuthService {
  private loggedIn = false;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  toggle(): void {
    this.loggedIn = !this.loggedIn;
  }

  status(): string {
    return this.loggedIn ? 'авторизован' : 'гость';
  }
}
