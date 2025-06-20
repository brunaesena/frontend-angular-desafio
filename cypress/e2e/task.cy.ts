describe("Gerenciamento de Tarefas", () => {
  const nomeUsuario = `Usuário ${Date.now()}`;
  const emailUsuario = `usuario${Date.now()}@teste.com`;

  before(() => {
    cy.visit("/users");
    cy.contains("Criar novo").click();
    cy.get('input[formControlName="name"]').type(nomeUsuario);
    cy.get('input[formControlName="email"]').type(emailUsuario);
    cy.get('button[type="submit"]').click();
  });

  beforeEach(() => {
    cy.visit("/tasks");
  });

  it("deve exibir título e botão de criação", () => {
    cy.contains("Gerenciar Tarefas").should("exist");
    cy.contains("Criar nova").should("exist");
  });

  it("deve abrir o modal ao clicar em 'Criar nova'", () => {
    cy.contains("Criar nova").click();
    cy.contains("Criar Tarefa").should("exist");
  });

  it("Deve criar uma nova tarefa", () => {
    const nome = `Usuário Teste ${Date.now()}`;
    const email = `usuario${Date.now()}@teste.com`;
    const titulo = `Tarefa Teste ${Date.now()}`;

    cy.visit("/users");
    cy.contains("Criar novo").click();
    cy.get('input[formControlName="name"]').type(nome);
    cy.get('input[formControlName="email"]').type(email);
    cy.get('button[type="submit"]').click();

    cy.visit("/tasks");
    cy.contains("Criar nova").click();
    cy.get('input[formControlName="title"]').type(titulo);
    cy.get('textarea[formControlName="description"]').type("Descrição da tarefa");

    cy.get('select[formControlName="userId"] option')
      .last()
      .then(option => {
        const userId = option.val()!;
        cy.get('select[formControlName="userId"]').select(userId);
      });

    cy.get('button[type="submit"]').click();

    cy.contains("Tarefa criada com sucesso").should("exist");

    cy.contains(titulo).should("exist");
  });


  it("deve permitir editar tarefa (exceto se estiver COMPLETED)", () => {
    cy.contains("Tarefa Teste")
      .parent()
      .find('button[data-testid="edit-task"]')
      .click();

    cy.get('input[formControlName="title"]')
      .clear()
      .type("Tarefa Editada");

    cy.get('button[type="submit"]').click();

    cy.contains("Tarefa atualizada com sucesso").should("exist");
    cy.contains("Tarefa Editada").should("exist");
  });


  it("não deve permitir editar tarefa COMPLETED", () => {
    cy.contains("Tarefa Editada").parent().find('button[data-testid="edit-task"]').click();
    cy.get('select[formControlName="status"]').select("Concluído");
    cy.get('button[type="submit"]').click();
    cy.contains("Tarefa Editada").parent().find('button[data-testid="edit-task"]').click();
    cy.contains("Não é possível editar tarefas concluídas").should("exist");
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get('button[type="button"]').contains("Cancelar").click();
  });

  it("deve permitir excluir tarefa", () => {
    cy.contains("Tarefa Editada").parent().find('button[data-testid="delete-task"]').click();
    cy.contains("Tem certeza que deseja excluir").should("exist");
    cy.contains("Sim").click();
    cy.contains("Tarefa deletada com sucesso").should("exist");
  });

  it("deve filtrar por status", () => {
    cy.contains("Criar nova").click();
    cy.get('input[formControlName="title"]').type("Tarefa Pendente");
    cy.get('textarea[formControlName="description"]').type("Pendente");
    cy.get('select[formControlName="userId"] option')
      .last()
      .then(option => {
        const userId = option.val()!;
        cy.get('select[formControlName="userId"]').select(userId);
      });
    cy.get('button[type="submit"]').click();

    cy.contains("Tarefa criada com sucesso.").should("exist");
    cy.contains("Tarefa criada com sucesso.").should("not.exist");

    cy.get('[data-testid="filter-status"]').select('Pendente');

    cy.contains("Pendente").should("exist");
  });

  it("deve filtrar por usuário responsável", () => {
    const nomeUsuario = `Usuário Filtro ${Date.now()}`;
    const emailUsuario = `usuario_filtro${Date.now()}@teste.com`;

    cy.visit("/users");
    cy.contains("Criar novo").click();
    cy.get('input[formControlName="name"]').type(nomeUsuario);
    cy.get('input[formControlName="email"]').type(emailUsuario);
    cy.get('button[type="submit"]').click();

    cy.visit("/tasks");
    cy.contains("Criar nova").click();
    cy.get('input[formControlName="title"]').type("Tarefa Pendente");
    cy.get('textarea[formControlName="description"]').type("Pendente");
    cy.get('select[formControlName="userId"] option')
      .last()
      .then(option => {
        const userId = option.val()!;
        cy.get('select[formControlName="userId"]').select(userId);
      });
    cy.get('button[type="submit"]').click();

    cy.contains("Tarefa criada com sucesso.").should("exist");
    cy.contains("Tarefa criada com sucesso.").should("not.exist");

    cy.get('[data-testid="filter-user"] option')
      .last()
      .then(option => {
        const userId = option.val()!;
        cy.get('[data-testid="filter-user"]').select(userId);
      });

    cy.contains("Tarefa Pendente").should("exist");
  });

});
