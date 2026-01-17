import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEmailFromToken should return email from JWT payload', () => {
    const payload = btoa(JSON.stringify({ email: 'admin@example.com', sub: '1' }));
    const fakeJwt = `aaa.${payload}.bbb`;

    localStorage.setItem('token', fakeJwt);

    expect(service.getEmailFromToken()).toBe('admin@example.com');
  });
});
