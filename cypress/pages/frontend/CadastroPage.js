class CadastroPage {

    inserirNome (nome) {
        cy.get('[data-testid="nome"]').type(nome)
    }

    inserirEmail (email) {
        cy.get('[data-testid="email"]').type(email)
    }

    inserirSenha (senha) {
        cy.get('[data-testid="password"]').type(senha)
    }

    marcarAdmin () {
        cy.get('[data-testid="checkbox"]').check()
    }

    cadastrarUsuario () {
        cy.get('[data-testid="cadastrar"]').click()
    }
}

export default new CadastroPage()