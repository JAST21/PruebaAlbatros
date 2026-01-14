import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost:3000/posts';
  constructor(private http: HttpClient) { }

  // Método para obtener los posts
  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para obtener un post por ID
  getPostById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Método para crear un nuevo post
  createPost(postData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, postData);
  }
}
