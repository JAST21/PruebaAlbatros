import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { PostsComponent } from './posts.component';
import { PostsService } from '../../services/posts.service';

describe('PostsComponent', () => {
  let fixture: ComponentFixture<PostsComponent>;
  let component: PostsComponent;

  const postsSig = signal<any[]>([]);
  const loadingSig = signal<boolean>(false);

  const postsServiceMock = {
    posts: postsSig,
    loading: loadingSig,

    getPosts: jasmine.createSpy('getPosts').and.callFake(() => {
      // si quieres que el template tenga data, setéala aquí
      postsSig.set([]);
      return of({
        success: true,
        message: 'ok',
        data: { items: [], meta: { totalPages: 1, totalItems: 0 } },
      });
    }),

    deletePost: jasmine.createSpy('deletePost').and.returnValue(
      of({ success: true, message: 'ok', data: null }),
    ),
  };

  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent], // standalone
      providers: [
        { provide: PostsService, useValue: postsServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit -> loadPosts()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPosts on init', () => {
    expect(postsServiceMock.getPosts).toHaveBeenCalled();
  });

  it('createPost should navigate', () => {
    component.createPost();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/posts/create']);
  });
});
