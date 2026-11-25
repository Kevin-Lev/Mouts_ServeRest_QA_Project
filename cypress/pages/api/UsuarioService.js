class UsuarioService {
    createUser(userPayload) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.expose('API_URL')}/usuarios`,
            body: userPayload,
            failOnStatusCode: false
        })
    }

    getAllUsers() {
        return cy.request({
            method: 'GET',
            url: `${Cypress.expose('API_URL')}/usuarios`,
            failOnStatusCode: false
        })
    }

    getUserById(userId) {
        return cy.request({
            method: 'GET',
            url: `${Cypress.expose('API_URL')}/usuarios/${userId}`,
            failOnStatusCode: false
        })
    }

    updateUser(userId, userPayload) {
        return cy.request({
            method: 'PUT',
            url: `${Cypress.expose('API_URL')}/usuarios/${userId}`,
            body: userPayload,
            failOnStatusCode: false
        })
    }

    deleteUser(userId) {
        return cy.request({
            method: 'DELETE',
            url: `${Cypress.expose('API_URL')}/usuarios/${userId}`,
            failOnStatusCode: false
        })
    }

    loginUser(email, password) {
        return cy.request({
            method: 'POST',
            url: `${Cypress.expose('API_URL')}/login`,
            body: {
                email,
                password
            },
            failOnStatusCode: false
        })
    }
}

export default new UsuarioService()