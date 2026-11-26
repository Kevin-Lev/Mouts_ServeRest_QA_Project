import UsuarioService from "../pages/api/UsuarioService"

Cypress.Commands.add('login', ({email, password}) => {
    cy.session(email, () => {
        UsuarioService.loginUsuario(email, password).then((res) => {
            cy.then(() => {
                window.localStorage.setItem('serverest/userEmail', email)
                window.localStorage.setItem('serverest/userPassword', password)
                window.localStorage.setItem('serverest/userToken', res.body.authorization)
            })
        })
    })
})