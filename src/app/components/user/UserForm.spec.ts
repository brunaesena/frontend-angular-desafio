import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserForm } from './UserForm';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('UserForm', () => {
    let component: UserForm;
    let fixture: ComponentFixture<UserForm>;



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, HttpClientModule, UserForm],
        }).compileComponents();

        fixture = TestBed.createComponent(UserForm);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve exibir "Criar novo usuário" quando não estiver editando', () => {
        component.isEdit = false;
        fixture.detectChanges();
        const title = fixture.nativeElement.querySelector('h3');
        expect(title.textContent).toContain('Criar novo usuário');
    });

    it('deve exibir "Editar usuário" quando estiver editando', () => {
        component.isEdit = true;
        fixture.detectChanges();
        const title = fixture.nativeElement.querySelector('h3');
        expect(title.textContent).toContain('Editar usuário');
    });


    it('deve emitir "saved" com dados válidos ao submeter', () => {
        spyOn(component.saved, 'emit');

        spyOn(component['userService'], 'create').and.returnValue(
            of({ id: 1, name: 'João', email: 'joao@email.com' })
        );

        component.userForm.setValue({ name: 'João', email: 'joao@email.com' });
        component.submit();

        expect(component.saved.emit).toHaveBeenCalled();
    });


    it('deve emitir "close" ao cancelar', () => {
        spyOn(component.close, 'emit');
        component.cancel();
        expect(component.close.emit).toHaveBeenCalled();
    });
});
