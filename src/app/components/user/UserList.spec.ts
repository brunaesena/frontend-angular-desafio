import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserList } from './UserList';
import { By } from '@angular/platform-browser';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList]
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    component.users = [
      { id: 1, name: 'João', email: 'joao@email.com', createdAt: new Date() },
    ];
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a lista de usuários', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('João');
  });

  it('deve emitir "edit" ao clicar no botão de editar', () => {
    spyOn(component.edit, 'emit');
    const editBtn = fixture.debugElement.query(By.css('button')).nativeElement;
    editBtn.click();
    expect(component.edit.emit).toHaveBeenCalledWith(component.users[0]);
  });

  it('deve emitir "delete" ao clicar no botão de deletar', () => {
    spyOn(component.delete, 'emit');
    const deleteBtn = fixture.nativeElement.querySelectorAll('button')[1];
    deleteBtn.click();
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });
});
