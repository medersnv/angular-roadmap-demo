import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { DEMO_NAV_ITEMS, DemoNavItem } from './demo-nav';

@Component({
  selector: 'app-demo-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './demo-layout.html',
  styleUrl: './demo-layout.scss',
})
export class DemoLayout {
  protected readonly navGroups = groupNavItems(DEMO_NAV_ITEMS);
  protected readonly expandedGroups = signal<ReadonlySet<string>>(new Set());

  protected toggleGroup(name: string): void {
    this.expandedGroups.update((current) => {
      const next = new Set(current);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  protected isExpanded(name: string): boolean {
    return this.expandedGroups().has(name);
  }
}

function groupNavItems(items: DemoNavItem[]): { name: string; items: DemoNavItem[] }[] {
  const groups = new Map<string, DemoNavItem[]>();

  for (const item of items) {
    const group = groups.get(item.group) ?? [];
    group.push(item);
    groups.set(item.group, group);
  }

  return [...groups.entries()].map(([name, groupItems]) => ({ name, items: groupItems }));
}
