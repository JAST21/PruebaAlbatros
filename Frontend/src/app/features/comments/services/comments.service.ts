import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../../shared/models/comment.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) { }

  // metodo para obtener comentarios por ID de post
  getByPost(postId: string): Observable<ApiResponse<Comment[]>> {
    return this.http.get<ApiResponse<Comment[]>>(
      `${this.apiUrl}/${postId}`
    );
  }


  // metodo para crear un nuevo comentario
  createComment(commentData: {
    postId: string;
    name: string;
    email: string;
    body: string;
  }): Observable<ApiResponse<Comment>> {
    return this.http.post<ApiResponse<Comment>>(this.apiUrl, commentData);
  }

  // metodo para eliminar comentario
  removeComment(commentId: string): Observable<ApiResponse<Comment>> {
    return this.http.delete<ApiResponse<Comment>>(`${this.apiUrl}/${commentId}`);
  }
}