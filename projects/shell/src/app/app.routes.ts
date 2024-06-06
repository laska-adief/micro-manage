import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('dashboard/Component').then((m) => m.AppComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('admin/routes').then((m) => m.routes),
  },
];
