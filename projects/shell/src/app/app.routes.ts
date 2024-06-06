import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('dashboard/Component').then((m) => m.AppComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('admin/Component').then((m) => m.AppComponent),
  },
];
