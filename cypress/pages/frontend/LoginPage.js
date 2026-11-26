class LoginPage {
  iniciaTelaLogin() {
    cy.visit('/login')
  }

  inserirEmail(email) {
    cy.get('[data-testid="email"]').type(email)
  }

  inserirSenha(senha) {
    cy.get('[data-testid="senha"]').type(senha)
  }

  clicaBotaoLogin() {
    cy.get('[data-testid="entrar"]').click()
  }

  mudarParaCadastro() {
    cy.get('[data-testid="cadastrar"]').click()
  }
}

export default new LoginPage()
