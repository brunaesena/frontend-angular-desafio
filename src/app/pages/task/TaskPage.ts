import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-task-page',
  templateUrl: './TaskPage.html',
  styleUrls: ['./TaskPage.scss']
})
export class TaskPage implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  filteredTasks: Task[] = [];

  selectedTask: Task | null = null;
  isModalOpen = false;
  isEditMode = false;

  filterUserId: number | null = null;
  filterStatus: TaskStatus | '' = '';

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesUser = !this.filterUserId || task.userId === +this.filterUserId;
      const matchesStatus = !this.filterStatus || task.status === this.filterStatus;
      return matchesUser && matchesStatus;
    });
  }

  openCreateModal() {
    this.selectedTask = null;
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(task: Task) {
    this.selectedTask = { ...task };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onTaskSaved() {
    this.closeModal();
    this.loadTasks();
  }

  deleteTask(id: number) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.delete(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }
}
