import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { DEMO_NAV_ITEMS, DemoNavItem } from './demo-nav';

@Component({
  selector: 'app-demo-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './demo-layout.html',
  styleUrl: './demo-layout.scss',
})
export class DemoLayout {
  private readonly router = inject(Router);

  protected readonly navGroups = groupNavItems(DEMO_NAV_ITEMS);
  protected readonly expandedGroups = signal<ReadonlySet<string>>(new Set());

  // Быстрый поиск группы по пути пункта меню (например, 'rxjs-combining' → '3. RxJS (Deep Dive)').
  private readonly pathToGroup = new Map(DEMO_NAV_ITEMS.map((item) => [item.path, item.group]));

  constructor() {
    // На каждую навигацию (и на старте) раскрываем группу активного маршрута.
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event) => event.urlAfterRedirects),
        startWith(this.router.url),
        takeUntilDestroyed(),
      )
      .subscribe((url) => this.expandActiveGroup(url));
  }

  private expandActiveGroup(url: string): void {
    const path = url.split(/[?#]/)[0].replace(/^\//, '');
    const group = this.pathToGroup.get(path);
    if (!group) {
      return;
    }
    this.expandedGroups.update((current) => {
      if (current.has(group)) {
        return current;
      }
      const next = new Set(current);
      next.add(group);
      return next;
    });
  }

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
