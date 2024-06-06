import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('dashboard/routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    loadChildren: () => import('admin/routes').then((m) => m.routes),
  },
];
