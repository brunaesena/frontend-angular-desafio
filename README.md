# Frontend Angular - Sistema de Tarefas e Usuários

Este repositório contém o frontend da aplicação desenvolvida no desafio técnico, utilizando **Angular** para o gerenciamento de usuários e tarefas em um ambiente com arquitetura de microserviços.

---

## 📁 Estrutura do Projeto

Este projeto faz parte de uma estrutura maior, organizada da seguinte forma:

```
root/
├── frontend-angular-desafio   # Este repositório
├── infra                      # Infraestrutura Docker (banco de dados, containers)
├── task-microservice          # Microsserviço de tarefas (Spring Boot)
└── user-microservice          # Microsserviço de usuários (Spring Boot)
```

---

## 🚀 Como rodar o frontend

### ✅ Opção 1 — Docker com infraestrutura completa

Ao subir a infraestrutura com Docker Compose, o frontend será iniciado automaticamente na porta `4200`.

```bash
cd ../infra
docker-compose up --build
```

Acesse no navegador:

```
http://localhost:4200
```

O frontend já estará se comunicando com os microsserviços de usuários (`8081`) e tarefas (`8082`).

---

### 🛠️ Opção 2 — Rodar localmente com Angular CLI

Se preferir rodar o frontend manualmente com hot reload:

```bash
npm install
ng serve
```

> Por padrão, a aplicação será iniciada em `http://localhost:4200`.

**Atenção**: certifique-se de que os microsserviços `user` e `task` estejam rodando (via Docker ou localmente) nas portas `8081` e `8082`.

---

## 📦 Tecnologias Utilizadas

- Angular 16
- TypeScript
- SCSS
- Docker (para build de produção)
- Comunicação com APIs REST de microsserviços

---

## 📋 Funcionalidades

- Listagem, criação, edição e exclusão de usuários
- Listagem, filtragem e gerenciamento de tarefas
- Modal customizado para formulários
- Validações e feedback ao usuário
- Comunicação com os microsserviços via HTTP

---

## 📌 Notas Finais

- O frontend foi projetado com arquitetura **smart/dumb components**
- Ao utilizar o Docker Compose da pasta `infra`, nenhuma configuração adicional é necessária.

---
