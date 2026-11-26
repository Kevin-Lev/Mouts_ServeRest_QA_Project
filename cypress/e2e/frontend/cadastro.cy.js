import UsuarioFactory from "../../factories/UsuarioFactory"
import UsuarioService from "../../pages/api/UsuarioService"
import CadastroPage from "../../pages/frontend/CadastroPage"
import LoginPage from "../../pages/frontend/LoginPage"

describe('Cadastro de Usuários', () => {
    let userPayload
    let existingUserPayload

    before(() => {
        userPayload = UsuarioFactory.createUser()
        existingUserPayload = UsuarioFactory.createUser()

        UsuarioService.createUser(existingUserPayload)
    })

    beforeEach(() => {
        LoginPage.iniciaTelaLogin()
        LoginPage.mudarParaCadastro()
    })

    it('Cadastrar usuário comum com sucesso', () => {
        CadastroPage.inserirNome(userPayload.nome)
        CadastroPage.inserirEmail(userPayload.email)
        CadastroPage.inserirSenha(userPayload.password)
        
        CadastroPage.cadastrarUsuario()

        cy.contains('Cadastro realizado com sucesso').should('be.visible')
        cy.url().should('include', '/home')
    })

    it('Cadastrar admin com sucesso', () => {
        const adminPayload = UsuarioFactory.createUser()

        CadastroPage.inserirNome(adminPayload.nome)
        CadastroPage.inserirEmail(adminPayload.email)
        CadastroPage.inserirSenha(adminPayload.password)
        CadastroPage.marcarAdmin()

        CadastroPage.cadastrarUsuario()

        cy.contains('Cadastro realizado com sucesso').should('be.visible')
        cy.url().should('include', '/home')
    })

    it('Cadastro deve falhar se houverem campos vazios', () => {
        CadastroPage.cadastrarUsuario()

        cy.contains('Nome é obrigatório').should('be.visible')
        cy.contains('Email é obrigatório').should('be.visible')
        cy.contains('Password é obrigatório').should('be.visible')

        cy.url().should('include', '/cadastrarusuarios')
    })

    it('Cadastro deve falhar se e-mail já foi cadastrado', () => {
        CadastroPage.inserirNome(userPayload.nome)
        CadastroPage.inserirEmail(existingUserPayload.email)
        CadastroPage.inserirSenha(userPayload.password)

        CadastroPage.cadastrarUsuario()

        cy.contains('Este email já está sendo usado').should('be.visible')

        cy.url().should('include', '/cadastrarusuarios')
    })    
})