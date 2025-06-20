import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './TaskList';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { TaskStatus } from 'src/app/models/TaskStatus';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;

    component.tasks = [
      {
        id: 1,
        title: 'Tarefa 1',
        description: 'Desc',
        status: 'PENDING',
        createdAt: '2025-06-20T10:00:00Z',
        dueDate: '',
        userId: 1,
      } as Task,
    ];

    component.users = [{ id: 1, name: 'Maria' } as User];

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar uma linha por tarefa', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
  });

  it('deve emitir evento de editar ao clicar no botão', () => {
    spyOn(component.edit, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.edit.emit).toHaveBeenCalledWith(component.tasks[0]);
  });

  it('deve emitir evento de deletar ao clicar no botão', () => {
    spyOn(component.delete, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    expect(component.delete.emit).toHaveBeenCalledWith(component.tasks[0].id);
  });
});
