import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent extends BaseComponent implements OnInit {

  form!: FormGroup;
  postId?: string;
  isEditMode = false;
  loading = false;

  constructor(
    location: Location,
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) { super(location); }

  // Inicialización del componente
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: ['', Validators.required]
    });

    this.postId = this.route.snapshot.paramMap.get('id') || undefined;

    // Si hay un ID de post, estamos en modo edición
    if (this.postId) {
      this.isEditMode = true;
      this.loadPostData(this.postId);
    }
  }

  // Cargar datos del post en modo edición
  loadPostData(id: string): void {
    this.loading = true;
    // Obtener el post por ID
    this.postsService.getPostById(id).subscribe({
      next: (response) => {
        // Rellenar el formulario con los datos del post
        this.form.patchValue({
          title: response.data.title,
          body: response.data.body,
          author: response.data.author
        });
        this.loading = false;

      },
      // Manejar errores
      error: () => {
        this.loading = false;
      }
    });
  }

  // Manejar el envío del formulario
  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    // Determinar si crear o actualizar el post
    const action = this.isEditMode ? this.postsService.updatePost(this.postId!, this.form.value)
      : this.postsService.createPost(this.form.value);

    // Suscribirse a la acción correspondiente
    action.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}