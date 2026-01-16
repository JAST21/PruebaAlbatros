import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../comments/services/comments.service';
import { BaseComponent } from '../../../../shared/components/base.component';
import { Location } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent extends BaseComponent implements OnInit {

  post: any;
  comments: any[] = [];
  loading = true;

  commentForm!: FormGroup;

  constructor(
    location: Location,
    private authService: AuthService,
    private notificationserv: NotificationService,
    private postsService: PostsService,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { super(location); }
  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id') || '';

    //Crear el form primero
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      body: ['', Validators.required],
    });

    //Autorellenar email desde token
    const email = this.authService.getEmailFromToken();
    if (email) {
      this.commentForm.patchValue({ email });
      this.commentForm.get('email')?.disable();
    }

    //Cargar datos
    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    }
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
    if (!this.post) return;
    if (this.commentForm.invalid) return;

    const raw = this.commentForm.getRawValue();

    const payload = {
      name: raw.name?.trim(),
      email: raw.email?.trim(),
      body: raw.body?.trim(),
      postId: this.post._id,
    };

    if (!payload.name || !payload.email || !payload.body) {
      this.notificationserv.showError('Todos los campos son obligatorios.');
      return;
    }

    this.commentsService.createComment(payload).subscribe({
      next: () => {
        this.commentForm.reset();

        // volver a poner el email automáticamente
        const email = this.authService.getEmailFromToken();
        if (email) {
          this.commentForm.patchValue({ email });
          this.commentForm.get('email')?.disable();
        }

        this.loadComments(this.post._id);
      },
    });
  }



  deleteComment(id: string) {
    if (!confirm('¿Eliminar este comentario?')) return;

    this.commentsService.removeComment(id, this.post._id).subscribe({
      next: () => {
        //quitarlo de la UI inmediatamente
        this.comments = this.comments.filter(c => c._id !== id);
      },
      error: () => {
        this.notificationserv.showError('No se pudo eliminar el comentario');
      }
    });
  }

}