import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserPage } from './pages/user/UserPage';
import { UserListComponent } from './components/user/UserList';
import { UserFormComponent } from './components/user/UserForm';

import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/HomePage';
import {appRoutes} from './app.routes'
import { TaskPage } from './pages/task/TaskPage';
import { TaskListComponent } from './components/task/TaskList';
import { TaskFormComponent } from './components/task/TaskForm';

@NgModule({
  declarations: [
    AppComponent,
    UserPage,
    UserListComponent,
    UserFormComponent,
    HomePage,
    TaskPage,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
