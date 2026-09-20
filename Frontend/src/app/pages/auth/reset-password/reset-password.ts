import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected isLoading = signal<boolean>(false);
  protected message = signal<string | null>(null);

  protected form = new FormGroup({
    token: new FormControl('sample-reset-token', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  protected onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    const token = this.form.value.token || '';
    const pass = this.form.value.newPassword || '';

    this.authService.resetPassword(token, pass).subscribe((res) => {
      this.isLoading.set(false);
      this.message.set(res.message);
      setTimeout(() => this.router.navigate(['/login']), 1500);
    });
  }
}
