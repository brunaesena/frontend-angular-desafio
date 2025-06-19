import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-task-list',
  templateUrl: './TaskList.html',
  styleUrls: ['./TaskList.scss'],
  imports: [CommonModule]
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Desconhecido';
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onDelete(taskId: number) {
    this.delete.emit(taskId);
  }
}
