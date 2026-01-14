import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

// Componente para manejar y mostrar posts
export class PostsComponent implements OnInit {
  posts: any[] = [];
  loading = false;

  // Inyección del servicio de posts
  constructor(private postsService: PostsService) { }

  // Inicialización del componente
  ngOnInit(): void {
    this.loading = true;
    this.postsService.getPosts().subscribe({
      next: (response: any) => {
        this.posts = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        this.loading = false;
      }
    });
  }
}
