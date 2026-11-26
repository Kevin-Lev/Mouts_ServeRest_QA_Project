# 🧪 Mouts ServeRest QA Project

![Cypress Tests](https://github.com/Kevin-Lev/Mouts_ServeRest_QA_Project/actions/workflows/pipeline.yml/badge.svg)

Suíte de testes automatizados (API + Frontend) da aplicação [ServeRest](https://serverest.dev), construída com **Cypress** e **JavaScript**, seguindo o padrão **Page Object Model**.

## 📋 Sobre o Projeto

- **Frontend sob teste**: https://front.serverest.dev
- **API sob teste**: https://serverest.dev
- **Framework**: Cypress
- **Linguagem**: JavaScript
- **CI/CD**: GitHub Actions (`.github/workflows/pipeline.yml`)

## 📁 Estrutura do Projeto

```
Mouts_ServeRest_QA_Project/
├── .github/
│   └── workflows/
│       └── pipeline.yml       # Pipeline de CI (API + Frontend)
├── cypress/
│   ├── e2e/
│   │   ├── api/                # Testes de API (login, usuario, produto)
│   │   └── frontend/
│   │       ├── cenario_1_usuario/        # Cadastro e login de usuário comum
│   │       ├── cenario_2_admin_usuario/  # Admin cadastra/exclui usuário
│   │       └── cenario_3_admin_produto/  # Admin cadastra/exclui produto
│   ├── factories/               # Geração de dados dinâmicos (Faker)
│   ├── fixtures/                # Arquivos de apoio (ex: imagem para upload)
│   ├── pages/
│   │   ├── api/                 # Page Objects da API (UsuarioService, ProdutoService)
│   │   └── frontend/             # Page Objects do Frontend (LoginPage, CadastroPage, UsuarioPage, AdminPage)
│   └── support/
│       └── commands.js          # Comandos customizados (ex: cy.login com cache de sessão)
├── cypress.config.js             # Configuração do Cypress (baseUrl, API_URL)
├── package.json                  # Scripts e dependências
└── README.md
```

## 🛠️ Pré-requisitos

- Node.js 20+
- npm

## ⚙️ Instalação

```bash
git clone https://github.com/Kevin-Lev/Mouts_ServeRest_QA_Project.git
cd Mouts_ServeRest_QA_Project
npm install
```

## 📦 Scripts Úteis

```bash
# Abrir o Cypress no modo interativo (runner visual)
npm run cy:open

# Rodar toda a suíte no Firefox headless
npm run cy:run

# Rodar apenas os testes de API
npm run cy:run:api

# Checar o código com ESLint
npm run lint

# Formatar o código com Prettier
npm run format

# Só checar a formatação, sem alterar nada (usado no CI)
npm run format:check
```

## 👨‍💻 Autor

**Kevin Silva**
