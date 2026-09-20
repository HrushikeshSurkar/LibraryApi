import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserResponse } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Injectable({ providedIn: 'root' })
export class UsersPageService {
  private readonly userService = inject(UserService);

  public getAllUsers(): Observable<User[]> {
    return this.userService.getAllUsers().pipe(
      map((res) => {
        const list = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        return list.map((u: any) => ({
          user_id: u.user_id || u.id || u.Id || '',
          user_name: u.user_name || u.name || u.Name || 'User',
          user_email: u.user_email || u.email || u.Email || '',
          user_contact: u.user_contact || u.contact || u.Contact || 'N/A',
          user_address: u.user_address || u.address || u.Address || 'N/A',
          user_role: u.user_role || u.role || u.Role || 'Reader',
        }));
      })
    );
  }

  public addUser(user: User): Observable<UserResponse> {
    return this.userService.addUser(user);
  }

  public updateUser(id: string, user: User): Observable<UserResponse> {
    return this.userService.updateUser(id, user);
  }

  public deleteUser(id: string): Observable<UserResponse> {
    return this.userService.deleteUser(id);
  }
}
