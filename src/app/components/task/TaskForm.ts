import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/models/User';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-task-form',
  templateUrl: './TaskForm.html',
  styleUrls: ['./TaskForm.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class TaskForm implements OnInit, OnChanges {
applyFilters() {
throw new Error('Method not implemented.');
}
  @Input() task: Task | null = null;
  @Input() isEdit = false;
  @Input() users: User[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  taskForm!: FormGroup;

  statuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
filterUserId: any;

  constructor(private fb: FormBuilder, private taskService: TaskService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || ''],
      dueDate: [this.task?.dueDate || ''],
      status: [this.task?.status || 'PENDING'],
      userId: [this.task?.userId || '', Validators.required]
      
    });
    console.log(this.users)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && this.taskForm) {
      console.log('Usuários atualizados:', this.users);
      this.cdr.detectChanges();
    }
  }

  submit() {
    if (this.taskForm.invalid) return;

    const data = this.taskForm.value;

    if (this.isEdit && this.task?.id) {
      this.taskService.update(this.task.id, data).subscribe(() => this.saved.emit());
    } else {
      this.taskService.create(data).subscribe(() => this.saved.emit());
    }
  }

  cancel() {
    this.close.emit();
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      PENDING: 'Pendente',
      IN_PROGRESS: 'Em Andamento',
      COMPLETED: 'Concluído'
    };
    return labels[status] || status;
  }
}
