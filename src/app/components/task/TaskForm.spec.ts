import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './TaskForm';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStatus } from 'src/app/models/TaskStatus';
import { User } from 'src/app/models/User';
import { TaskService } from 'src/app/services/task.service';
import { of } from 'rxjs';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;
  const mockTaskService = {
    create: jasmine.createSpy('create').and.returnValue(of({})),
    update: jasmine.createSpy('update').and.returnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm, ReactiveFormsModule, FormsModule, CommonModule],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    component.users = [{ id: 1, name: 'Maria' } as User];
    fixture.detectChanges();
  });

  it('deve criar o formulário', () => {
    expect(component).toBeTruthy();
    expect(component.taskForm).toBeDefined();
  });

  it('deve ser inválido quando obrigatório não é preenchido', () => {
    component.taskForm.controls['title'].setValue('');
    component.taskForm.controls['userId'].setValue('');
    expect(component.taskForm.valid).toBeFalse();
  });

  it('deve emitir cancelAction ao clicar no botão Cancelar', () => {
    spyOn(component.close, 'emit');
    const btn = fixture.nativeElement.querySelector('button[type="button"]');
    btn.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('deve emitir saved com dados válidos ao chamar submit()', () => {
    spyOn(component.saved, 'emit');
    component.taskForm.setValue({
      title: 'Nova tarefa',
      description: 'Descrição',
      dueDate: null,
      status: 'PENDING',
      userId: 1,
    });
    expect(component.taskForm.valid).toBeTrue();
    component.submit();
    expect(component.saved.emit).toHaveBeenCalled();
  });
});
