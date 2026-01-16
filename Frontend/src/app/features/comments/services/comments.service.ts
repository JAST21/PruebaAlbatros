import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, tap, switchMap } from 'rxjs';
import { Comment } from '../../../shared/models/comment.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) { }

  comments = signal<Comment[]>([]);
  loading = signal<boolean>(false);
  // metodo para obtener comentarios por ID de post
  getByPost(postId: string): Observable<ApiResponse<Comment[]>> {
    this.loading.set(true);

    return this.http
      .get<ApiResponse<Comment[]>>(`${this.apiUrl}/${postId}`)
      .pipe(
        delay(300),
        tap(response => {
          this.comments.set(response.data);
          this.loading.set(false);
        }),
        catchError(error => {
          this.loading.set(false);
          throw error;
        })
      );
  }


  // metodo para crear un nuevo comentario
  createComment(commentData: {
    postId: string;
    name: string;
    email: string;
    body: string;
  }): Observable<ApiResponse<Comment[]>> {
    return this.http.post<ApiResponse<Comment>>(this.apiUrl, commentData).pipe(
      switchMap(() => this.getByPost(commentData.postId)),
      catchError(error => {
        throw error;
      })
    );
  }

  // metodo para eliminar comentario
  removeComment(commentId: string, postId: string): Observable<ApiResponse<Comment[]>> {
    return this.http.delete<ApiResponse<Comment>>(`${this.apiUrl}/${commentId}`).pipe(
      switchMap(() => this.getByPost(postId)),
      catchError(error => {
        throw error;
      })
    );
  }
}