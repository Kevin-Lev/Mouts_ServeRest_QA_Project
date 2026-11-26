class ProdutoService {
  createProduto(usuarioToken, produtoPayload) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.expose('API_URL')}/produtos`,
      body: produtoPayload,
      headers: {
        Authorization: usuarioToken,
      },
      failOnStatusCode: false,
    })
  }

  updateProduto(usuarioToken, produtoId, produtoPayload) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.expose('API_URL')}/produtos/${produtoId}`,
      body: produtoPayload,
      headers: {
        Authorization: usuarioToken,
      },
      failOnStatusCode: false,
    })
  }

  getAllProdutos(filtros = {}) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.expose('API_URL')}/produtos`,
      qs: filtros,
      failOnStatusCode: false,
    })
  }

  getProduto(produtoId) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.expose('API_URL')}/produtos/${produtoId}`,
      failOnStatusCode: false,
    })
  }

  deleteProduto(usuarioToken, produtoId) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.expose('API_URL')}/produtos/${produtoId}`,
      headers: {
        Authorization: usuarioToken,
      },
      failOnStatusCode: false,
    })
  }
}

export default new ProdutoService()
