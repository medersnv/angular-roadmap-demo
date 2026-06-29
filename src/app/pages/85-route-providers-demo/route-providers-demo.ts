import { Component, signal } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { ROUTE_PROVIDERS_ESSENTIALS, ROUTE_PROVIDERS_MOMENTS } from './route-providers-info';

interface Instance {
  id: number;
  count: number;
}

@Component({
  selector: 'app-route-providers-demo',
  templateUrl: './route-providers-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class RouteProvidersDemo {
  protected readonly meta = getCurriculumItem('route-providers')!;
  protected readonly essentials = ROUTE_PROVIDERS_ESSENTIALS;
  protected readonly moments = ROUTE_PROVIDERS_MOMENTS;

  // --- Root-синглтон: создан один раз, состояние живёт вечно ---
  protected readonly rootCount = signal(0);

  // --- Route-scoped: создаётся при входе в ветку, уничтожается при выходе ---
  protected readonly scoped = signal<Instance | null>(null);
  protected readonly log = signal<string[]>([]);
  private nextId = 0;

  protected enter(): void {
    if (this.scoped()) {
      return;
    }
    const id = ++this.nextId;
    this.scoped.set({ id, count: 0 });
    this.addLog(`Вход в /wizard → new WizardState #${id} (step = 0)`);
  }

  protected leave(): void {
    const inst = this.scoped();
    if (!inst) {
      return;
    }
    this.scoped.set(null);
    this.addLog(`Выход из /wizard → WizardState #${inst.id} уничтожен (состояние потеряно)`);
  }

  protected incScoped(): void {
    this.scoped.update((inst) => (inst ? { ...inst, count: inst.count + 1 } : inst));
  }

  protected incRoot(): void {
    this.rootCount.update((n) => n + 1);
  }

  private addLog(line: string): void {
    this.log.update((lines) => [...lines, line].slice(-6));
  }
}
