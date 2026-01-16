import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },

  // publica
  {
    path: 'login',
    loadComponent: () =>
    import('./features/auth/pages/login.component')
        .then(m => m.LoginComponent),
  },

  // protegidas
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/posts/pages/AllPosts/posts.component')
        .then(m => m.PostsComponent),
  },
  {
    path: 'posts/create',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/posts/pages/PostForm/post-form.component')
        .then(m => m.PostFormComponent),
  },
  {
    path: 'posts/edit/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/posts/pages/PostForm/post-form.component')
        .then(m => m.PostFormComponent),
  },
  {
    path: 'posts/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/posts/pages/PostDetails/post-details.component')
        .then(m => m.PostDetailsComponent),
  },

  // ---------- fallback ----------
  {
    path: '**',
    redirectTo: 'posts',
  },
];
