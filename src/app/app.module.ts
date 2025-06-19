import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserPage } from './pages/user/UserPage';
import { UserList } from './components/user/UserList';
import { UserForm } from './components/user/UserForm';

import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/HomePage';
import {appRoutes} from './app.routes'
import { TaskPage } from './pages/task/TaskPage';
import { TaskList } from './components/task/TaskList';
import { TaskForm } from './components/task/TaskForm';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppComponent,
     UserPage,
    UserList,
    UserForm,
    HomePage,
    TaskPage,
    TaskList,
    TaskForm
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
