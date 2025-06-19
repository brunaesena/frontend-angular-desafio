import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './UserList.html',
  styleUrls: ['./UserList.scss'],
  imports: [CommonModule ]
})
export class UserList {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();

  onEdit(user: User) {
    this.edit.emit(user);
  }

  onDelete(userId: number) {
    this.delete.emit(userId);
  }
}
