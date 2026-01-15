import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../comments/services/comments.service';


@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {

  post: any;
  comments: any[] = [];
  loading = true;

  commentForm!: FormGroup;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id') || '';

    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    }

    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],// validadores síncronos van en un arreglo 
      body: ['', Validators.required]
    });
  }

  // Cargar el post por ID
  loadPost(id: string): void {
    this.postsService.getPostById(id).subscribe({
      next: (response) => {
        this.post = response.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Cargar comentarios del post
  loadComments(postId: string) {
    this.commentsService.getByPost(postId).subscribe({
      next: (response) => {
        console.log('Comentarios cargados:', response.data);
        this.comments = response.data;
      },
    });
  }

  // Enviar un nuevo comentario
  addComment(): void {
    console.log('Post actual:', this.post);
    if (this.commentForm.invalid) return;

    const payload = {
      ...this.commentForm.value,
      postId: this.post._id
    };

    this.commentsService.createComment(payload).subscribe({
      next: () => {
        this.commentForm.reset();
        this.loadComments(this.post._id);
      },
    });
  }

  // Eliminar un comentario
  deleteComment(commentId: string): void {
    this.commentsService.removeComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(comment => comment._id !== commentId); // Actualiza la lista de comentarios localmente
      },
    });
  }
}