import { TaskStatus } from './TaskStatus';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt?: string;
  dueDate?: string;
  userId: number;
}
