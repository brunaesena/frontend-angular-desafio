describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir o título de boas-vindas', () => {
    cy.contains('Bem-vindo(a)!').should('be.visible');
    cy.contains('O que deseja fazer?').should('be.visible');
  });

  it('deve exibir os botões de navegação', () => {
    cy.contains('Gerenciar Usuários').should('be.visible');
    cy.contains('Gerenciar Tarefas').should('be.visible');
  });

  it('deve redirecionar para /users ao clicar em "Gerenciar Usuários"', () => {
    cy.contains('Gerenciar Usuários').click();
    cy.url().should('include', '/users');
  });

  it('deve redirecionar para /tasks ao clicar em "Gerenciar Tarefas"', () => {
    cy.contains('Gerenciar Tarefas').click();
    cy.url().should('include', '/tasks');
  });
});