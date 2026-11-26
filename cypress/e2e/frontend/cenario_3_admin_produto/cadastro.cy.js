import UsuarioFactory from '../../../factories/UsuarioFactory'
import UsuarioService from '../../../pages/api/UsuarioService'
import ProdutoFactory from '../../../factories/ProdutoFactory'
import ProdutoService from '../../../pages/api/ProdutoService'
import AdminPage from '../../../pages/frontend/AdminPage'

describe('Admin cadastra produto', () => {
  let adminPayload
  let existingProdutoPayload

  before(() => {
    adminPayload = UsuarioFactory.createAdmin()
    existingProdutoPayload = ProdutoFactory.createProduto()

    UsuarioService.createUsuario(adminPayload)

    return UsuarioService.loginUsuario(
      adminPayload.email,
      adminPayload.password,
    ).then((res) => {
      return ProdutoService.createProduto(
        res.body.authorization,
        existingProdutoPayload,
      )
    })
  })

  beforeEach(() => {
    cy.login({ email: adminPayload.email, password: adminPayload.password })
    cy.visit('/admin/home')
    AdminPage.clicaMenuCadastrarProdutos()
  })

  it('Admin deve cadastrar produto com sucesso', () => {
    const produtoPayload = ProdutoFactory.createProduto()

    AdminPage.inserirNomeProduto(produtoPayload.nome)
    AdminPage.inserirPrecoProduto(produtoPayload.preco)
    AdminPage.inserirDescricaoProduto(produtoPayload.descricao)
    AdminPage.inserirQuantidadeProduto(produtoPayload.quantidade)
    AdminPage.anexarImagemProduto('cypress/fixtures/banana_nanica.jpg')

    AdminPage.clicaCadastrarProduto()

    cy.url().should('include', 'admin/listarprodutos')
    cy.contains(produtoPayload.nome).should('be.visible')
  })

  it('Deve falhar ao cadastrar produto com nome já cadastrado', () => {
    const produtoPayload = {
      ...ProdutoFactory.createProduto(),
      nome: existingProdutoPayload.nome,
    }

    AdminPage.inserirNomeProduto(produtoPayload.nome)
    AdminPage.inserirPrecoProduto(produtoPayload.preco)
    AdminPage.inserirDescricaoProduto(produtoPayload.descricao)
    AdminPage.inserirQuantidadeProduto(produtoPayload.quantidade)

    AdminPage.clicaCadastrarProduto()

    cy.contains('Já existe produto com esse nome').should('be.visible')
    cy.url().should('include', 'admin/cadastrarprodutos')
  })

  it('Deve falhar ao cadastrar produto com preço negativo', () => {
    const produtoPayload = { ...ProdutoFactory.createProduto(), preco: -10 }

    AdminPage.inserirNomeProduto(produtoPayload.nome)
    AdminPage.inserirPrecoProduto(produtoPayload.preco)
    AdminPage.inserirDescricaoProduto(produtoPayload.descricao)
    AdminPage.inserirQuantidadeProduto(produtoPayload.quantidade)

    AdminPage.clicaCadastrarProduto()

    cy.contains('Preco deve ser um número positivo').should('be.visible')
    cy.url().should('include', 'admin/cadastrarprodutos')
  })

  it('Deve falhar ao cadastrar produto com campos vazios', () => {
    AdminPage.clicaCadastrarProduto()

    cy.contains('Nome é obrigatório').should('be.visible')
    cy.contains('Preco é obrigatório').should('be.visible')
    cy.contains('Descricao é obrigatório').should('be.visible')
    cy.contains('Quantidade é obrigatório').should('be.visible')

    cy.url().should('include', 'admin/cadastrarprodutos')
  })
})
