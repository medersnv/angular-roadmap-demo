import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/demo-layout').then(m => m.DemoLayout),
    children: [
      { path: '', redirectTo: 'lifecycle', pathMatch: 'full' },
      {
        path: 'lifecycle',
        loadComponent: () =>
          import('./pages/lifecycle-demo/lifecycle-demo')
            .then(m => m.LifecycleDemo),
      },
      {
        path: 'onpush',
        loadComponent: () =>
          import('./pages/onpush-demo/onpush-demo')
            .then(m => m.OnpushDemo),
      },
      {
        path: 'cdr',
        loadComponent: () =>
          import('./pages/cdr-demo/cdr-demo')
            .then(m => m.CdrDemo),
      },
      {
        path: 'zone',
        loadComponent: () =>
          import('./pages/zone-demo/zone-demo')
            .then(m => m.ZoneDemo),
      },
      {
        path: 'zoneless',
        loadComponent: () =>
          import('./pages/zoneless-demo/zoneless-demo')
            .then(m => m.ZonelessDemo),
      },
      {
        path: 'inject',
        loadComponent: () =>
          import('./pages/inject-demo/inject-demo')
            .then(m => m.InjectDemo),
      },
      {
        path: 'injectors',
        loadComponent: () =>
          import('./pages/injectors-demo/injectors-demo')
            .then(m => m.InjectorsDemo),
      },
      {
        path: 'providers',
        loadComponent: () =>
          import('./pages/providers-demo/providers-demo')
            .then(m => m.ProvidersDemo),
      },
    ],
  },
];
