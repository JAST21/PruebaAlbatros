import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, Observable, tap } from 'rxjs';
import { Post } from '../../../shared/models/post.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost:3000/posts';
  

  posts = signal<Post[]>([]); // Signal para almacenar los posts
  loading = signal<boolean>(false); // Signal para el estado de carga

  constructor(private http: HttpClient) { }


  // Método para obtener los posts
  getPosts(): Observable<ApiResponse<Post[]>> {
    this.loading.set(true);
    return this.http.get<ApiResponse<Post[]>>(this.apiUrl).pipe(tap(response => {
      this.posts.set(response.data);
      this.loading.set(false);
    }),
      catchError(error => {
        this.loading.set(false);
        throw error;
      }
      ));
  }

  // Método para obtener un post por ID
  getPostById(id: string): Observable<ApiResponse<Post>> {
    return this.http.get<ApiResponse<Post>>(`${this.apiUrl}/${id}`).pipe(
      delay(300), // Simula un retraso de 500ms
      catchError(error => {
        throw error;
      })
    );
  }

  // Método para crear un nuevo post
  createPost(postData: any): Observable<ApiResponse<Post>> {
    return this.http.post<ApiResponse<Post>>(this.apiUrl, postData).pipe(
      tap(response => {
        // Actualiza la señal de posts con el nuevo post
        this.posts.update(posts => [response.data, ...posts]);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  // Método para actualizar un post existente
  updatePost(id: string, postData: any): Observable<ApiResponse<Post>> {
    return this.http.put<ApiResponse<Post>>(`${this.apiUrl}/${id}`, postData).pipe(
      tap(response => {
        // Actualiza la señal de posts con el post actualizado
        this.posts.update(posts => posts.map(post => post._id === id ? response.data : post));
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  // Método para eliminar un post
  deletePost(id: string): Observable<ApiResponse<Post>> {
    return this.http.delete<ApiResponse<Post>>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Actualiza la señal de posts eliminando el post
        this.posts.update(posts => posts.filter(post => post._id !== id));
      }),
      catchError(error => {
        throw error;
      })
    );
  }
}