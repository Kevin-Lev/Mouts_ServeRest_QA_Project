class UsuarioPage {
  clicaBotaologout() {
    cy.get('[data-testid="logout"]').click()
  }
}

export default new UsuarioPage()
