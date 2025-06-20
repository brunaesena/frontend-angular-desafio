import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { UserList } from "../../components/user/UserList";
import { UserForm } from "../../components/user/UserForm";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from 'src/app/components/shared/back-button.component';


@Component({
  selector: 'app-user-page',
  templateUrl: './UserPage.html',
  styleUrls: ['./UserPage.scss'],
  imports: [UserList, UserForm, FormsModule, CommonModule, BackButtonComponent]
})
export class UserPage implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  selectedUser: User | null = null;
  isModalOpen = false;
  isEditMode = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  openCreateModal() {
    this.selectedUser = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(user: User) {
    this.selectedUser = { ...user };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onUserSaved() {
    this.closeModal();
    this.loadUsers();
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteUserId: number | null = null;
  isConfirmDeleteOpen = false;
  feedbackMessage = '';

  deleteUser(userId: number) {
    this.deleteUserId = userId;
    this.isConfirmDeleteOpen = true;
  }

  confirmDelete() {
    if (this.deleteUserId === null) return;

    this.userService.delete(this.deleteUserId).subscribe({
      next: () => {
        this.feedbackMessage = 'Usuário deletado com sucesso.';
        this.loadUsers();
      },
      error: (err) => {
        const customMessage = err?.error?.errorMessage || 'Erro desconhecido.';
        this.feedbackMessage = `Não foi possível deletar o usuário: ${customMessage}`;
        setTimeout(() => this.feedbackMessage = '', 3000);
      },
      complete: () => {
        this.isConfirmDeleteOpen = false;
        this.deleteUserId = null;
        setTimeout(() => this.feedbackMessage = '', 3000);
      }
    });
  }

  cancelDelete() {
    this.isConfirmDeleteOpen = false;
    this.deleteUserId = null;
  }

}
