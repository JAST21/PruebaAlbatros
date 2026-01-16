import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../../../shared/models/post.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
// Decorador del componente

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe, HighlightDirective],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

// Componente para manejar y mostrar posts
export class PostsComponent implements OnInit {

  //signals
  posts = this.postsService.posts;
  loading = this.postsService.loading;
  search = signal<string>('');

  // computed para filtrar posts según el término de búsqueda
  filteredPosts = computed(() => {
    const searchTerm = this.search().toLowerCase();
    if (!searchTerm) {
      return this.posts();
    }
    // Filtra los posts que coinciden con el término de búsqueda en título, cuerpo o autor
    return this.posts().filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.body.toLowerCase().includes(searchTerm) ||
      post.author.toString().includes(searchTerm)
    );
  });
  // Inyección del servicio de posts
  constructor(private postsService: PostsService,
    private roouter: Router
  ) { }

  // Inicialización del componente
  ngOnInit(): void {
    this.loadPosts();
  }

  // Método para cargar los posts desde el servicio
  loadPosts(): void {
    this.loading.set(true);
    this.postsService.getPosts().subscribe({
      next: (response) => {
        this.posts.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar los posts:', error);
        this.loading.set(false);
      }

    });
  }

  // Método para manejar el cambio en el campo de búsqueda
  onSearchChange(value: string): void {
    this.search.set(value);
  }

  // Método para navegar a la creación de un nuevo post
  createPost(): void {
    this.roouter.navigate(['/posts/create']);
  }

  // Método para navegar a los detalles de un post
  viewPostDetails(postId: string): void {
    this.roouter.navigate(['/posts', postId]);
  }

  // Método para navegar a la edición de un post
  editPost(postId: string): void {
    this.roouter.navigate(['/posts/edit', postId]);
  }

  // Método para eliminar un post
  deletePost(postId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      this.postsService.deletePost(postId).subscribe({
        next: () => {
          // Actualiza la lista de posts después de eliminar
          this.posts.update(posts => posts.filter(post => post._id !== postId));
          alert('Post eliminado exitosamente.');
        },
        error: (error) => {
          console.error('Error al eliminar el post:', error);
        }
      });
    }
  }
}