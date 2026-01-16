import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, Observable, retry, switchMap, tap, throwError } from 'rxjs';
import { Post } from '../../../shared/models/post.model';
import { ApiResponse } from '../../../shared/models/apiResponse.model';
import { Paginated } from '../../../shared/models/paginated.model';
import { buildQueryParams } from '../../../core/utils/http-utils';
import { DEFAULT_PAGE_SIZE } from '../../../core/utils/pagination.utils';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private apiUrl = 'http://localhost:3000/posts';

  posts = signal<Post[]>([]);
  loading = signal<boolean>(false);
  // estado interno del paginado
  private search = '';
  private page = 1;
  private limit = DEFAULT_PAGE_SIZE;

  constructor(private http: HttpClient) { }

  getPosts(search = '', page = 1, limit = DEFAULT_PAGE_SIZE): Observable<ApiResponse<Paginated<Post>>> {
    this.loading.set(true);
    // guardamos el estado actual
    this.search = search;
    this.page = page;
    this.limit = limit;
    const queryParams = buildQueryParams({ search, page, limit });

    return this.http.get<ApiResponse<Paginated<Post>>>(`${this.apiUrl}${queryParams}`).pipe(
      retry(2),
      delay(200),
      tap((response) => {
        // ahora viene data.items
        this.posts.set(response.data.items ?? []);
        this.loading.set(false);
      }),
      catchError((error) => {
        this.loading.set(false);
        return throwError(() => error);
      }),
    );
  }

  getPostById(id: string): Observable<ApiResponse<Post>> {
    return this.http.get<ApiResponse<Post>>(`${this.apiUrl}/${id}`).pipe(
      delay(200),
      catchError((error) => throwError(() => error)),
    );
  }

  //devolvemos el listado paginado actualizado
  createPost(postData: any) {
    return this.http.post(this.apiUrl, postData).pipe(
      switchMap(() =>
        this.getPosts(this.search, this.page, this.limit)
      )
    );
  }

  //actualizar un post
  updatePost(id: string, postData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, postData).pipe(
      switchMap(() =>
        this.getPosts(this.search, this.page, this.limit)
      )
    );
  }

  //eliminar un post
  deletePost(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      switchMap(() =>
        this.getPosts(this.search, this.page, this.limit)
      )
    );
  }
}
