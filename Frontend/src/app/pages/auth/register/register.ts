import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected isLoading = signal<boolean>(false);
  protected errorMessage = signal<string | null>(null);
  protected successMessage = signal<string | null>(null);

  protected registerForm = new FormGroup({
    user_name: new FormControl('', Validators.required),
    user_email: new FormControl('', [Validators.required, Validators.email]),
    user_contact: new FormControl('', [Validators.required, Validators.minLength(10)]),
    user_address: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  protected onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const values = this.registerForm.value;

    this.authService
      .register({
        user_name: values.user_name || '',
        user_email: values.user_email || '',
        user_contact: values.user_contact || '',
        user_address: values.user_address || '',
        user_pass: values.password || '',
      })
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          if (res.success) {
            this.successMessage.set('Account created! Redirecting to login...');
            setTimeout(() => this.router.navigate(['/login']), 1500);
          } else {
            this.errorMessage.set(res.message);
          }
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Registration failed. Please try again.');
        },
      });
  }
}
