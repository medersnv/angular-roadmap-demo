import { Component, computed, signal } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { FEATURE_ESSENTIALS, FEATURE_SNIPPETS, FEATURE_TREE, LayerNode } from './feature-architecture-info';

@Component({
  selector: 'app-feature-architecture-demo',
  templateUrl: './feature-architecture-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class FeatureArchitectureDemo {
  protected readonly meta = getCurriculumItem('feature-architecture')!;
  protected readonly essentials = FEATURE_ESSENTIALS;
  protected readonly tree = FEATURE_TREE;
  protected readonly snippets = FEATURE_SNIPPETS;

  protected readonly nodes: LayerNode[] = [
    { id: 'orders', label: 'features/orders', layer: 'feature' },
    { id: 'catalog', label: 'features/catalog', layer: 'feature' },
    { id: 'shared', label: 'shared', layer: 'shared' },
    { id: 'core', label: 'core', layer: 'core' },
  ];

  protected readonly from = signal('orders');
  protected readonly to = signal('catalog');

  protected readonly verdict = computed(() => {
    const a = this.byId(this.from());
    const b = this.byId(this.to());
    if (a.id === b.id) {
      return { ok: true, reason: 'Внутри одного модуля — без ограничений.' };
    }
    return this.rule(a, b);
  });

  protected setFrom(id: string): void {
    this.from.set(id);
  }

  protected setTo(id: string): void {
    this.to.set(id);
  }

  private byId(id: string): LayerNode {
    return this.nodes.find((n) => n.id === id)!;
  }

  /** Правила направлений зависимостей между слоями. */
  private rule(a: LayerNode, b: LayerNode): { ok: boolean; reason: string } {
    if (a.layer === 'feature' && b.layer === 'feature') {
      return { ok: false, reason: 'Фичи не должны знать друг о друге — общее выносим в shared/core.' };
    }
    if (a.layer === 'feature') {
      return { ok: true, reason: 'Фича опирается на shared/core — это разрешённое направление.' };
    }
    if (a.layer === 'shared' && b.layer === 'feature') {
      return { ok: false, reason: 'shared обязан быть «глупым»: он не может зависеть от конкретной фичи.' };
    }
    if (a.layer === 'shared' && b.layer === 'core') {
      return { ok: true, reason: 'shared может пользоваться инфраструктурой core.' };
    }
    if (a.layer === 'core') {
      return { ok: false, reason: 'core — фундамент: он не зависит ни от shared, ни от фич.' };
    }
    return { ok: true, reason: 'Разрешено.' };
  }
}
