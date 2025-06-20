describe("Gerenciamento de Usuários", () => {
    const nome = `Usuário Teste ${Date.now()}`;
    const email = `usuario${Date.now()}@teste.com`;

    beforeEach(() => {
        cy.visit("/users");
    });

    it("deve criar um novo usuário", () => {
        cy.contains("Criar novo").click();
        cy.get('input[formControlName="name"]').type(nome);
        cy.get('input[formControlName="email"]').type(email);
        cy.get('button[type="submit"]').click();

        cy.contains(nome).should("exist");
        cy.contains(email).should("exist");
    });

    it("deve editar um usuário", () => {
        const novoNome = `Nome Editado ${Date.now()}`;

        cy.get('[data-testid="edit-user"]').first().click();
        cy.get('input[formControlName="name"]').clear().type(novoNome);
        cy.get('button[type="submit"]').click();

        cy.contains(novoNome).should("exist");
    });

    it("não deve permitir criação com email duplicado", () => {
        cy.contains("Criar novo").click();
        cy.get('input[formControlName="name"]').type("Usuário Duplicado");
        cy.get('input[formControlName="email"]').type(email);
        cy.get('button[type="submit"]').click();

        cy.contains("Email já cadastrado").should("exist");
    });

    it("deve excluir usuário sem tarefas", () => {
        cy.get('[data-testid="delete-user"]').last().click();
        cy.contains("Tem certeza que deseja excluir este usuário?").should("be.visible");
        cy.contains("Sim").click();
        cy.contains("Usuário deletado com sucesso").should("exist");
    });

    it("não deve excluir usuário com tarefas", () => {
        const nomeTarefa = `Usuário Tarefa ${Date.now()}`;
        const emailTarefa = `usuario_tarefa${Date.now()}@teste.com`;

        cy.visit("/users");

        cy.contains("Criar novo").click();
        cy.get('input[formControlName="name"]').type(nomeTarefa);
        cy.get('input[formControlName="email"]').type(emailTarefa);
        cy.get('button[type="submit"]').click();

        cy.visit("/tasks");
        cy.contains("Criar nova").click();
        cy.get('input[formControlName="title"]').type("Tarefa vinculada");
        cy.get('textarea[formControlName="description"]').type("Descrição teste");

        cy.get('select[formControlName="userId"] option')
            .last()
            .then(option => {
                const userId = option.val()!;
                cy.get('select[formControlName="userId"]').select(userId);
            });

        cy.get('button[type="submit"]').click();

        cy.visit("/users");
        cy.contains(emailTarefa)
            .parents("tr")
            .find('[data-testid="delete-user"]')
            .click();

        cy.contains("Sim").click();


        cy.contains("Não foi possível deletar").should("exist");
    });

});
