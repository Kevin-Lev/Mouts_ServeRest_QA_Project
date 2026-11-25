class ProdutoService {
    createProduto(userToken, productPayload) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.expose('API_URL')}/produtos`,
            body: productPayload,
            headers: {
                Authorization: userToken
            },
            failOnStatusCode: false
        })
    }

    updateProduto(userToken, productId, productPayload) {
        return cy.request({
            method: 'PUT',
            url: `${Cypress.expose('API_URL')}/produtos/${productId}`,
            body: productPayload,
            headers: {
                Authorization: userToken
            },
            failOnStatusCode: false
        })
    }

    getAllProduto() {
        return cy.request({
            method: 'GET',
            url: `${Cypress.expose('API_URL')}/produtos`,
            failOnStatusCode: false
        })
    }

    getProduto(productId) {
        return cy.request({
            method: 'GET',
            url: `${Cypress.expose('API_URL')}/produtos/${productId}`,
            failOnStatusCode: false
        })
    }

    deleteProduto(userToken, productId) {
        return cy.request({
            method: 'DELETE',
            url: `${Cypress.expose('API_URL')}/produtos/${productId}`,
            headers: {
                Authorization: userToken
            },
            failOnStatusCode: false
        })
    }
}

export default new ProdutoService