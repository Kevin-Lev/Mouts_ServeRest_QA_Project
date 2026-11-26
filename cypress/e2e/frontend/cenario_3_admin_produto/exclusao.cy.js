import UsuarioFactory from "../../../factories/UsuarioFactory"
import UsuarioService from "../../../pages/api/UsuarioService"
import ProdutoFactory from "../../../factories/ProdutoFactory"
import ProdutoService from "../../../pages/api/ProdutoService"
import AdminPage from "../../../pages/frontend/AdminPage"

describe('Admin exclui produto', () => {
    let adminPayload

    before(() => {
        adminPayload = UsuarioFactory.createAdmin()

        return UsuarioService.createUser(adminPayload)
    })

    beforeEach(() => {
        cy.login({ email: adminPayload.email, password: adminPayload.password })
        cy.visit('/admin/home')
        AdminPage.clicaMenuListarProdutos()
    })

    it('Admin deve excluir produto com sucesso', () => {
        const produtoPayload = ProdutoFactory.createProduct()

        UsuarioService.loginUser(adminPayload.email, adminPayload.password).then((res) => {
            return ProdutoService.createProduto(res.body.authorization, produtoPayload)
        }).then(() => {
            cy.reload()

            AdminPage.clicaExcluirProduto(produtoPayload.nome)

            cy.contains(produtoPayload.nome).should('not.exist')
        })
    })
})
