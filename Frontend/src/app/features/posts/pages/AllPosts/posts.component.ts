import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { DEFAULT_PAGE_SIZE } from '../../../../core/utils/pagination.utils';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe, HighlightDirective],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})

export class PostsComponent implements OnInit {
  posts = this.postsService.posts;
  loading = this.postsService.loading;

  search = signal<string>('');

  page = signal<number>(1);
  limit = signal<number>(DEFAULT_PAGE_SIZE)

  totalPages = signal<number>(1);
  totalItems = signal<number>(0);

  constructor(private postsService: PostsService, private roouter: Router) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getPosts(this.search(), this.page(), this.limit()).subscribe({
      next: (response) => {
        console.log('GET /posts RESPONSE =>', response);
        this.totalPages.set(response.data.meta.totalPages);
        this.totalItems.set(response.data.meta.totalItems);
      },
      error: (error) => console.error('Error al cargar los posts:', error),
    });
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.page.set(1);
    this.loadPosts();
  }

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.loadPosts();
    }
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadPosts();
    }
  }

  createPost(): void {
    this.roouter.navigate(['/posts/create']);
  }

  viewPostDetails(postId: string): void {
    this.roouter.navigate(['/posts', postId]);
  }

  editPost(postId: string): void {
    this.roouter.navigate(['/posts/edit', postId]);
  }

  deletePost(postId: string): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este post?')) return;

    this.postsService.deletePost(postId).subscribe({
      next: () => {
        // refresca para mantener meta y página consistentes
        this.loadPosts();
      },
      error: (error) => console.error('Error al eliminar el post:', error),
    });
  }
}
