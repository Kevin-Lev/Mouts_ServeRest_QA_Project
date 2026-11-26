import UsuarioFactory from "../../../factories/UsuarioFactory"
import UsuarioService from "../../../pages/api/UsuarioService"
import AdminPage from "../../../pages/frontend/AdminPage"

describe('Admin exclui usuário', () => {
    let adminPayload

    before(() => {
        adminPayload = UsuarioFactory.createAdmin()

        return UsuarioService.createUser(adminPayload)
    })

    beforeEach(() => {
        cy.login({ email: adminPayload.email, password: adminPayload.password })
        cy.visit('/admin/home')
        AdminPage.clicaMenuListarUsuarios()
    })

    it('Admin deve excluir usuário com sucesso', () => {
        const userPayload = UsuarioFactory.createUser()

        UsuarioService.createUser(userPayload).then(() => {
            cy.reload()

            AdminPage.clicaExcluirUsuario(userPayload.email)

            cy.contains(userPayload.email).should('not.exist')
        })
    })

    it('Admin não deve conseguir excluir o próprio usuário', () => {
        // o primeiro clique não dispara a validação, só o segundo. bug reproduzido manualmente.
        AdminPage.clicaExcluirUsuario(adminPayload.email)
        AdminPage.clicaExcluirUsuario(adminPayload.email) 

        cy.contains('Não é possível excluir o próprio usuário!').should('be.visible')
        cy.contains(adminPayload.email).should('be.visible')
    })
})
