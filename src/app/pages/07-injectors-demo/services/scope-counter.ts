import { Injectable } from '@angular/core';

/** Счётчик с именем scope — для демонстрации иерархии инжекторов. */
export class ScopeCounter {
  private count = 0;

  constructor(readonly scopeName: string) {}

  tick(): string {
    this.count++;
    return `${this.scopeName} → клик ${this.count}`;
  }
}

/** Singleton на уровне root injector. */
@Injectable({ providedIn: 'root' })
export class RootScopeService {
  private count = 0;

  tick(): string {
    this.count++;
    return `providedIn: 'root' → клик ${this.count}`;
  }
}

export function createScopeCounter(scopeName: string): ScopeCounter {
  return new ScopeCounter(scopeName);
}
