class UsuarioService {
  createUsuario(usuarioPayload) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.expose('API_URL')}/usuarios`,
      body: usuarioPayload,
      failOnStatusCode: false,
    })
  }

  getAllUsuarios() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.expose('API_URL')}/usuarios`,
      failOnStatusCode: false,
    })
  }

  getUsuarioById(usuarioId) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.expose('API_URL')}/usuarios/${usuarioId}`,
      failOnStatusCode: false,
    })
  }

  updateUsuario(usuarioId, usuarioPayload) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.expose('API_URL')}/usuarios/${usuarioId}`,
      body: usuarioPayload,
      failOnStatusCode: false,
    })
  }

  deleteUsuario(usuarioId) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.expose('API_URL')}/usuarios/${usuarioId}`,
      failOnStatusCode: false,
    })
  }

  loginUsuario(email, password) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.expose('API_URL')}/login`,
      body: {
        email,
        password,
      },
      failOnStatusCode: false,
    })
  }
}

export default new UsuarioService()
