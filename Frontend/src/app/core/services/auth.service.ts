import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ApiResponse } from '../../shared/models/apiResponse.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http
            .post<ApiResponse<{ access_token: string }>>(`${this.apiUrl}/login`, { email, password })
            .pipe(
                tap(res => localStorage.setItem('token', res.data.access_token))
            );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }


    //sacar el email 
    getEmailFromToken(): string | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload?.email ?? null;
        } catch {
            return null;
        }
    }

}
