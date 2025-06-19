import { Component, OnInit } from '@angular/core'; // Adicione OnInit aqui
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { UserList} from "../../components/user/UserList";
import { UserForm} from "../../components/user/UserForm";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-page',
  templateUrl: './UserPage.html',
  styleUrls: ['./UserPage.scss'],
  imports: [UserList, UserForm, FormsModule]
})
export class UserPage implements OnInit { 
  users: User[] = [];
  searchTerm: string = '';
  selectedUser: User | null = null;
  isModalOpen = false;
  isEditMode = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    console.log('tentanod carregar users')
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
    console.log(this.users)
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

  deleteUser(id: number) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.userService.delete(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}