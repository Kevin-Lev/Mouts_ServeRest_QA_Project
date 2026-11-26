import UsuarioFactory from "../../../factories/UsuarioFactory"
import UsuarioService from "../../../pages/api/UsuarioService"
import AdminPage from "../../../pages/frontend/AdminPage"

describe('Admin cadastra usuário', () => {
    let adminPayload
    let usuarioExistentePayload

    before(() => {
        adminPayload = UsuarioFactory.createAdmin()
        usuarioExistentePayload = UsuarioFactory.createUsuario()

        UsuarioService.createUsuario(adminPayload)
        return UsuarioService.createUsuario(usuarioExistentePayload)
    })

    beforeEach(() => {
        cy.login({ email: adminPayload.email, password: adminPayload.password })
        cy.visit('/admin/home')
        AdminPage.clicaMenuCadastrarUsuarios()
    })

    it('Admin deve cadastrar usuário comum com sucesso', () => {
        const usuarioPayload = UsuarioFactory.createUsuario()

        AdminPage.inserirNomeUsuario(usuarioPayload.nome)
        AdminPage.inserirEmailUsuario(usuarioPayload.email)
        AdminPage.inserirSenhaUsuario(usuarioPayload.password)

        AdminPage.clicaCadastrarUsuario()

        cy.url().should('include', 'admin/listarusuarios')
        cy.contains(usuarioPayload.email).should('be.visible')
    })

    it('Admin deve cadastrar admin com sucesso', () => {
        const novoAdminPayload = UsuarioFactory.createUsuario()

        AdminPage.inserirNomeUsuario(novoAdminPayload.nome)
        AdminPage.inserirEmailUsuario(novoAdminPayload.email)
        AdminPage.inserirSenhaUsuario(novoAdminPayload.password)
        AdminPage.marcarAdmin()

        AdminPage.clicaCadastrarUsuario()

        cy.url().should('include', 'admin/listarusuarios')
        cy.contains(novoAdminPayload.email).should('be.visible')
    })

    it('Deve falhar ao cadastrar usuário com e-mail já cadastrado', () => {
        const usuarioPayload = UsuarioFactory.createUsuario()

        AdminPage.inserirNomeUsuario(usuarioPayload.nome)
        AdminPage.inserirEmailUsuario(usuarioExistentePayload.email)
        AdminPage.inserirSenhaUsuario(usuarioPayload.password)

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
