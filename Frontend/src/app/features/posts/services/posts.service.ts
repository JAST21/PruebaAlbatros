import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, Observable, switchMap, tap, retry } from 'rxjs';
import { Post } from '../../../shared/models/post.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { buildQueryParams } from '../../../core/utils/http-utils';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost:3000/posts';


  posts = signal<Post[]>([]); // Signal para almacenar los posts
  loading = signal<boolean>(false); // Signal para el estado de carga

  constructor(private http: HttpClient) { }


  // Método para obtener todos los posts
  getPosts(search = '', page = 1): Observable<ApiResponse<Post[]>> {
    this.loading.set(true);

    const queryParams = buildQueryParams({ search, page });

    return this.http
      .get<ApiResponse<Post[]>>(`${this.apiUrl}${queryParams}`)
      .pipe(
        retry(2), // Reintenta la solicitud hasta 2 veces en caso de error
        delay(300), // Simula un retraso de 300ms
        tap(response => {
          // Actualiza la señal de posts con los datos recibidos
          this.posts.set(response.data);
          this.loading.set(false);
        }),
        catchError(error => {
          // En caso de error, desactiva el estado de carga y relanza el error
          this.loading.set(false);
          throw error;
        })
      );
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
  createPost(postData: any): Observable<ApiResponse<Post[]>> {
    return this.http.post<ApiResponse<Post>>(this.apiUrl, postData).pipe(
      switchMap(() => this.getPosts()),
      catchError(error => {
        throw error;
      })
    );
  }


  // Método para actualizar un post existente
  updatePost(id: string, postData: any): Observable<ApiResponse<Post[]>> {
    return this.http.put<ApiResponse<Post>>(`${this.apiUrl}/${id}`, postData).pipe(
      switchMap(() => this.getPosts()),
      catchError(error => {
        throw error;
      })
    );
  }


  // Método para eliminar un post
  deletePost(id: string): Observable<ApiResponse<Post[]>> {
    return this.http.delete<ApiResponse<Post>>(`${this.apiUrl}/${id}`).pipe(
      switchMap(() => this.getPosts()),// Actualiza la lista de posts después de eliminar
      catchError(error => {
        throw error;
      })
    );
  }

}