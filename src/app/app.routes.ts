import { Routes } from '@angular/router';
import { UserPage } from './pages/user/UserPage';
import { TaskPage } from './pages/task/TaskPage';
import { HomePage } from './pages/home/HomePage';

export const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'users', component: UserPage },
  { path: 'tasks', component: TaskPage },
  { path: '**', redirectTo: '' } 
];
