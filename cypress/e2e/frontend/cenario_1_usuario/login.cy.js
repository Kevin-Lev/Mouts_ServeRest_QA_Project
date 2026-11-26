import UsuarioFactory from "../../../factories/UsuarioFactory"
import UsuarioService from "../../../pages/api/UsuarioService"
import LoginPage from "../../../pages/frontend/LoginPage"
import UsuarioPage from "../../../pages/frontend/UsuarioPage"

describe('Login de Usuários', () => {
    let userPayload
    
    before(() => {
        userPayload = UsuarioFactory.createUser()

        return UsuarioService.createUser(userPayload)
    })

    beforeEach(() => {
        LoginPage.iniciaTelaLogin()
    })

    it('Deve fazer login com sucesso', () => {
        LoginPage.inserirEmail(userPayload.email)
        LoginPage.inserirSenha(userPayload.password)

        LoginPage.clicaBotaoLogin()

        cy.url().should('include', '/home')
    })

    it('Deve falhar o login ao inserir e-mail ou senha inválidos', () => {
        const usuarioInexistentePayload = UsuarioFactory.createUser()

        LoginPage.inserirEmail(usuarioInexistentePayload.email)
        LoginPage.inserirSenha(usuarioInexistentePayload.password)

        LoginPage.clicaBotaoLogin()

        cy.contains('Email e/ou senha inválidos').should('be.visible')
        cy.url().should('include', '/login')
    })

    it('Deve falhar o login ao deixar e-mail ou senha vazios', () => {
        LoginPage.clicaBotaoLogin()

        cy.contains('Email é obrigatório').should('be.visible')
        cy.contains('Password é obrigatório').should('be.visible')

        cy.url().should('include', '/login')
    })

    it('Deve realizar logout com sucesso', () => {
        cy.login({
            email: userPayload.email,
            password: userPayload.password
        })

        cy.visit('/home')

        UsuarioPage.clicaBotaologout()

        cy.url().should('include', '/login')
    })
})