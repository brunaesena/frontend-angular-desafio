import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-task-form',
  templateUrl: './TaskForm.html',
  styleUrls: ['./TaskForm.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Input() isEdit = false;
  @Input() users: User[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  taskForm!: FormGroup;

  statuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || ''],
      dueDate: [this.task?.dueDate || ''],
      status: [this.task?.status || 'PENDING'],
      userId: [this.task?.userId || '', Validators.required]
    });
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
}
