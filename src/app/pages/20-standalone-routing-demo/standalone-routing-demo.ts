import { Component, computed, signal } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { PROVIDE_ROUTER_ESSENTIALS, PROVIDE_ROUTER_MOMENTS, ROUTER_FEATURES } from './standalone-routing-info';

@Component({
  selector: 'app-standalone-routing-demo',
  templateUrl: './standalone-routing-demo.html',
  styleUrls: ['../shared/compare.scss', '../shared/widgets.scss'],
})
export class StandaloneRoutingDemo {
  protected readonly meta = getCurriculumItem('standalone-routing')!;
  protected readonly essentials = PROVIDE_ROUTER_ESSENTIALS;
  protected readonly moments = PROVIDE_ROUTER_MOMENTS;
  protected readonly features = ROUTER_FEATURES;

  protected readonly enabled = signal<ReadonlySet<string>>(new Set(['inputs', 'preload']));

  /** Старый стиль: объект флагов в forRoot */
  protected readonly legacyCode = computed(() => {
    const on = this.enabled();
    const flags = this.features.filter((f) => on.has(f.id) && !f.legacyFlag.startsWith('—'));

    if (flags.length === 0) {
      return `RouterModule.forRoot(routes)`;
    }

    const lines = flags.map((f) => `    ${f.legacyFlag},`).join('\n');
    return `RouterModule.forRoot(routes, {\n${lines}\n})`;
  });

  /** Новый стиль: композиция with*-функций */
  protected readonly modernCode = computed(() => {
    const on = this.enabled();
    const fns = this.features.filter((f) => on.has(f.id)).map((f) => `  ${f.call},`);

    if (fns.length === 0) {
      return `provideRouter(routes)`;
    }

    return [`provideRouter(`, `  routes,`, ...fns, `)`].join('\n');
  });

  protected isOn(id: string): boolean {
    return this.enabled().has(id);
  }

  protected toggle(id: string): void {
    this.enabled.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
}
