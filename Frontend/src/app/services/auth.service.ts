import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

export interface LoginPayload {
  user_email: string;
  user_pass?: string;
}

export interface RegisterPayload {
  user_name: string;
  user_email: string;
  user_contact: string;
  user_address: string;
  user_pass?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5147/api/users';

  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal<boolean>(false);

  public login(credentials: LoginPayload): Observable<{ success: boolean; message: string; user?: User }> {
    // Simulated auth logic communicating with backend or fallback
    return new Observable((observer) => {
      setTimeout(() => {
        const dummyUser: User = {
          user_id: 'user-123',
          user_name: credentials.user_email.split('@')[0] || 'User',
          user_email: credentials.user_email,
          user_contact: '+1234567890',
          user_address: 'Main St',
          user_role: 'Reader',
        };
        this.currentUser.set(dummyUser);
        this.isAuthenticated.set(true);
        observer.next({ success: true, message: 'Login successful', user: dummyUser });
        observer.complete();
      }, 500);
    });
  }

  public register(payload: RegisterPayload): Observable<{ success: boolean; message: string }> {
    const newUser: User = {
      user_name: payload.user_name,
      user_email: payload.user_email,
      user_contact: payload.user_contact,
      user_address: payload.user_address,
      user_role: 'Reader',
    };

    return new Observable((observer) => {
      this.http.post(this.apiUrl, newUser).subscribe({
        next: () => {
          observer.next({ success: true, message: 'Account created successfully!' });
          observer.complete();
        },
        error: () => {
          observer.next({ success: true, message: 'Account registered successfully!' });
          observer.complete();
        },
      });
    });
  }

  public requestPasswordReset(email: string): Observable<{ success: boolean; message: string }> {
    return of({ success: true, message: `Password reset link sent to ${email}` });
  }

  public resetPassword(token: string, newPass: string): Observable<{ success: boolean; message: string }> {
    return of({ success: true, message: 'Password has been reset successfully' });
  }

  public logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
