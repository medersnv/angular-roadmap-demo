export interface DemoNavItem {
  path: string;
  label: string;
  group: string;
}

export const DEMO_NAV_ITEMS: DemoNavItem[] = [
  { path: 'lifecycle', label: 'Lifecycle Hooks', group: 'Components' },
  { path: 'onpush', label: 'OnPush', group: 'Change Detection' },
  { path: 'cdr', label: 'ChangeDetectorRef', group: 'Change Detection' },
  { path: 'zone', label: 'Zone.js', group: 'Zone' },
  { path: 'zoneless', label: 'Zoneless', group: 'Zone' },
  { path: 'inject', label: 'inject()', group: 'Dependency Injection' },
  { path: 'injectors', label: 'Injectors', group: 'Dependency Injection' },
  { path: 'providers', label: 'Providers', group: 'Dependency Injection' },
];
