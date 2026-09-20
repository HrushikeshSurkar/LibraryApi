import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserRole } from '../../models/user.model';
import { UsersPageService } from './users.service';
import { Navbar } from '../dashboard/components/navbar/navbar';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, Navbar],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users implements OnInit {
  private readonly usersService = inject(UsersPageService);

  protected users = signal<User[]>([]);
  protected isEditMode = signal<boolean>(false);
  protected selectedUserId = signal<string | null>(null);

  protected userForm = new FormGroup({
    user_name: new FormControl('', Validators.required),
    user_email: new FormControl('', [Validators.required, Validators.email]),
    user_contact: new FormControl('', [Validators.required, Validators.minLength(10)]),
    user_address: new FormControl('', Validators.required),
    user_role: new FormControl<UserRole>('Reader', Validators.required),
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  protected saveUser(): void {
    if (this.userForm.invalid) return;

    const payload: User = {
      user_name: this.userForm.value.user_name || '',
      user_email: this.userForm.value.user_email || '',
      user_contact: this.userForm.value.user_contact || '',
      user_address: this.userForm.value.user_address || '',
      user_role: this.userForm.value.user_role || 'Reader',
    };

    const id = this.selectedUserId();
    if (this.isEditMode() && id) {
      this.usersService.updateUser(id, payload).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      this.usersService.addUser(payload).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  protected editUser(user: User): void {
    if (!user.user_id) return;
    this.selectedUserId.set(user.user_id);
    this.isEditMode.set(true);

    this.userForm.patchValue({
      user_name: user.user_name,
      user_email: user.user_email,
      user_contact: user.user_contact,
      user_address: user.user_address,
      user_role: user.user_role,
    });
  }

  protected deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.users.update((current) => current.filter((u) => u.user_id !== id));
    });
  }

  protected resetForm(): void {
    this.userForm.reset({ user_role: 'Reader' });
    this.isEditMode.set(false);
    this.selectedUserId.set(null);
  }
}
