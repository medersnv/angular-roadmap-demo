import { Component } from '@angular/core';
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
