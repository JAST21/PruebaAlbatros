import { Routes } from '@angular/router';
import { PostsComponent } from './features/posts/pages/AllPosts/posts.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
    },
    {
        path: 'posts',
        loadComponent: () => import('./features/posts/pages/AllPosts/posts.component').then(m => m.PostsComponent)
    },
    {
        path: 'posts/create',
        loadComponent: () => import('./features/posts/pages/PostForm/post-form.component').then(m => m.PostFormComponent)
    },
    {
        path: 'posts/:id',
        loadComponent: () => import('./features/posts/pages/PostDetails/post-details.component').then(m => m.PostDetailsComponent)
    },
    {
        path: 'posts/edit/:id',
        loadComponent: () =>
            import('./features/posts/pages/PostForm/post-form.component')
                .then(m => m.PostFormComponent)
    },
];
