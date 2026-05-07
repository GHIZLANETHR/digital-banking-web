// change-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  changePassword() {
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.error = 'New password and confirmation do not match';
      return;
    }
    this.authService.changePassword(this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword)
      .subscribe({
        next: () => {
          this.message = 'Password changed successfully. Please login again.';
          setTimeout(() => {
            this.authService.logout();
          }, 2000);
        },
        error: err => this.error = err.error?.message || 'Error changing password'
      });
  }
}
