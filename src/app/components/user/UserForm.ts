import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './UserForm.html',
  styleUrls: ['./UserForm.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserForm implements OnInit {
  @Input() user: User | null = null;
  @Input() isEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [this.user?.name || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]]
    });
  }

  feedbackMessage: string = '';

  submit() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;

    if (this.isEdit && this.user?.id) {
      this.userService.update(this.user.id, formValue).subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (err) => {
          const msg = err?.error?.errorMessage || 'Erro ao atualizar usuário.';
          this.feedbackMessage = msg;
          setTimeout(() => this.feedbackMessage = '', 3000);
        }
      });
    } else {
      this.userService.create(formValue).subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (err) => {
          const msg = err?.error?.errorMessage || 'Erro ao criar usuário.';
          this.feedbackMessage = msg;
          setTimeout(() => this.feedbackMessage = '', 3000);
        }
      });
    }
  }

  cancel() {
    this.close.emit();
  }
}
