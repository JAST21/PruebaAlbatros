import { fakeAsync, tick } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getPosts() should call GET and set posts signal', fakeAsync(() => {

    service.getPosts('', 1, 10).subscribe();

    // intercept request
    const req = httpMock.expectOne(
      'http://localhost:3000/posts?search=&page=1&limit=10'
    );

    req.flush({
      success: true,
      message: 'ok',
      data: {
        items: [
          { _id: '1', title: 'A', author: 'X', body: 'B', createdAt: new Date(), updatedAt: new Date() },
          { _id: '2', title: 'C', author: 'Y', body: 'D', createdAt: new Date(), updatedAt: new Date() },
        ],
        meta: { totalPages: 1, totalItems: 2 },
      },
    });

    tick(200); // necesario por delay(200)

    expect(service.posts().length).toBe(2);
  }));
});
