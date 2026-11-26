import UsuarioFactory from "../../../factories/UsuarioFactory"
import UsuarioService from "../../../pages/api/UsuarioService"
import AdminPage from "../../../pages/frontend/AdminPage"

describe('Admin cadastra usuário', () => {
    let adminPayload
    let existingUserPayload

    before(() => {
        adminPayload = UsuarioFactory.createAdmin()
        existingUserPayload = UsuarioFactory.createUser()

        UsuarioService.createUser(adminPayload)
        return UsuarioService.createUser(existingUserPayload)
    })

    beforeEach(() => {
        cy.login({ email: adminPayload.email, password: adminPayload.password })
        cy.visit('/admin/home')
        AdminPage.clicaMenuCadastrarUsuarios()
    })

    it('Admin deve cadastrar usuário comum com sucesso', () => {
        const userPayload = UsuarioFactory.createUser()

        AdminPage.inserirNomeUsuario(userPayload.nome)
        AdminPage.inserirEmailUsuario(userPayload.email)
        AdminPage.inserirSenhaUsuario(userPayload.password)

        AdminPage.clicaCadastrarUsuario()

        cy.url().should('include', 'admin/listarusuarios')
        cy.contains(userPayload.email).should('be.visible')
    })

    it('Admin deve cadastrar admin com sucesso', () => {
        const adminUserPayload = UsuarioFactory.createUser()

        AdminPage.inserirNomeUsuario(adminUserPayload.nome)
        AdminPage.inserirEmailUsuario(adminUserPayload.email)
        AdminPage.inserirSenhaUsuario(adminUserPayload.password)
        AdminPage.marcarAdmin()

        AdminPage.clicaCadastrarUsuario()

        cy.url().should('include', 'admin/listarusuarios')
        cy.contains(adminUserPayload.email).should('be.visible')
    })

    it('Deve falhar ao cadastrar usuário com e-mail já cadastrado', () => {
        const userPayload = UsuarioFactory.createUser()

        AdminPage.inserirNomeUsuario(userPayload.nome)
        AdminPage.inserirEmailUsuario(existingUserPayload.email)
        AdminPage.inserirSenhaUsuario(userPayload.password)

        AdminPage.clicaCadastrarUsuario()

        cy.contains('Este email já está sendo usado').should('be.visible')
        cy.url().should('include', 'admin/cadastrarusuarios')
    })

    it('Deve falhar ao cadastrar usuário com campos vazios', () => {
        AdminPage.clicaCadastrarUsuario()

        cy.contains('Nome é obrigatório').should('be.visible')
        cy.contains('Email é obrigatório').should('be.visible')
        cy.contains('Password é obrigatório').should('be.visible')

        cy.url().should('include', 'admin/cadastrarusuarios')
    })
})
