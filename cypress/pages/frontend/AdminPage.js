class AdminPage {

    clicaMenuCadastrarUsuarios() {
        cy.get('[data-testid="cadastrar-usuarios"]').click()
    }

    clicaMenuListarUsuarios() {
        cy.get('[data-testid="listar-usuarios"]').click()
    }

    clicaMenuCadastrarProdutos() {
        cy.get('[data-testid="cadastrar-produtos"]').click()
    }

    clicaMenuListarProdutos() {
        cy.get('[data-testid="listar-produtos"]').click()
    }

    inserirNomeUsuario(nome) {
        cy.get('[data-testid="nome"]').type(nome)
    }

    inserirEmailUsuario(email) {
        cy.get('[data-testid="email"]').type(email)
    }

    inserirSenhaUsuario(senha) {
        cy.get('[data-testid="password"]').type(senha)
    }

    marcarAdmin() {
        cy.get('[data-testid="checkbox"]').check()
    }

    clicaCadastrarUsuario() {
        cy.get('[data-testid="cadastrarUsuario"]').click()
    }

    inserirNomeProduto(nome) {
        cy.get('[data-testid="nome"]').type(nome)
    }

    inserirPrecoProduto(preco) {
        cy.get('[data-testid="preco"]').type(preco)
    }

    inserirDescricaoProduto(descricao) {
        cy.get('[data-testid="descricao"]').type(descricao)
    }

    inserirQuantidadeProduto(quantidade) {
        cy.get('[data-testid="quantity"]').type(quantidade)
    }

    clicaCadastrarProduto() {
        cy.get('[data-testid="cadastarProdutos"]').click()
    }

    clicaBotaologout() {
        cy.get('[data-testid="logout"]').click()
    }

    clicaExcluirUsuario(email) {
        cy.contains('tr', email).find('.btn-danger').click()
    }
}

export default new AdminPage()
