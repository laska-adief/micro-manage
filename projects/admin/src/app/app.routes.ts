import { Routes } from '@angular/router';
import { PostComponent } from './pages/post/post.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'post/list',
    pathMatch: 'full',
  },
  {
    path: 'post',
    component: PostComponent,
    children: [
      {
        path: 'list',
        component: PostListComponent,
      },
      {
        path: 'form',
        component: PostFormComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
