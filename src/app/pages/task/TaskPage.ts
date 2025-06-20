import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { TaskList } from 'src/app/components/task/TaskList';
import { TaskForm } from 'src/app/components/task/TaskForm';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from 'src/app/components/shared/back-button.component';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-task-page',
  templateUrl: './TaskPage.html',
  styleUrls: ['./TaskPage.scss'],
  imports: [TaskList, TaskForm, FormsModule, CommonModule, BackButtonComponent]
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

  constructor(private taskService: TaskService, private userService: UserService, private cdRef: ChangeDetectorRef) { }

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

  deleteTaskId: number | null = null;
  isConfirmDeleteOpen = false;
  feedbackMessage = '';

  deleteTask(taskId: number) {
    this.deleteTaskId = taskId;
    this.isConfirmDeleteOpen = true;
  }

  confirmDelete() {
    if (this.deleteTaskId === null) return;

    this.taskService.delete(this.deleteTaskId).subscribe({
      next: () => {
        this.feedbackMessage = 'Tarefa deletada com sucesso.';
        this.loadTasks();
      },
      error: (err) => {
        const customMessage = err?.error?.errorMessage || 'Erro desconhecido.';
        this.feedbackMessage = `Não foi possível deletar a tarefa: ${customMessage}`;
        setTimeout(() => this.feedbackMessage = '', 3000);
      },
      complete: () => {
        this.isConfirmDeleteOpen = false;
        this.deleteTaskId = null;
        setTimeout(() => (this.feedbackMessage = ''), 3000);
      }
    });
  }

  cancelDelete() {
    this.isConfirmDeleteOpen = false;
    this.deleteTaskId = null;
  }

  statuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      PENDING: 'Pendente',
      IN_PROGRESS: 'Em Andamento',
      COMPLETED: 'Concluído'
    };
    return labels[status] || status;
  }

  onSaved() {
    this.isModalOpen = false;
    this.loadTasks();

    if (this.isEditMode) {
      this.feedbackMessage = 'Tarefa atualizada com sucesso.';
    } else {
      this.feedbackMessage = 'Tarefa criada com sucesso.';
    }

    this.cdRef.detectChanges();

    setTimeout(() => {
      this.feedbackMessage = '';
      this.cdRef.detectChanges(); 
    }, 3000);
  }

}
