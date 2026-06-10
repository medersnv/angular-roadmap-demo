import { Routes } from '@angular/router';

import { buildCurriculumRoutes } from './curriculum/curriculum.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/demo-layout').then((m) => m.DemoLayout),
    children: [
      { path: '', loadComponent: () => import('./pages/00-home/home').then((m) => m.Home) },
      ...buildCurriculumRoutes(),
    ],
  },
];
