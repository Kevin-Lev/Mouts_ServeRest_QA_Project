import ProdutoFactory from "../../factories/ProdutoFactory"
import UsuarioFactory from "../../factories/UsuarioFactory"
import ProdutoService from "../../pages/api/ProdutoService"
import UsuarioService from "../../pages/api/UsuarioService"


describe('Produtos - ServerRest', () => {
    let userPayload
    let productPayload
    let userToken
    let productId
    
    before(() => {
        productPayload = ProdutoFactory.createProduct()
        userPayload = UsuarioFactory.createAdmin()

        UsuarioService.createUser(userPayload).then(() => {
            UsuarioService.loginUser(userPayload.email, userPayload.password).then((res) => {
                userToken = res.body.authorization
            })
        })
    })

    it('Produto deve ser criado com sucesso', () => {
        ProdutoService.createProduto(userToken, productPayload).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body._id).to.be.a('string').and.to.have.length(16)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')

            productId = res.body._id
        })
    })

    it('Todos os produtos devem ser listados', () => {
        ProdutoService.getAllProduto().then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).to.be.gte(1)
            expect(res.body.produtos).to.have.length.gte(1)
        })
    })

    it('Busca de produto específico deve ser retornada com sucesso', () => {
        ProdutoService.getProduto(productId).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body._id).to.be.eq(productId)
            expect(res.body.descricao).to.be.a('string')
            expect(res.body.preco).to.be.a('number')
            expect(res.body.quantidade).to.be.a('number')
        })
    })

    it('Produto deve ser atualizado com sucesso', () => {
        const updatedProductPayload = ProdutoFactory.createProduct()

        ProdutoService.updateProduto(userToken, productId, updatedProductPayload).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Registro alterado com sucesso')
        })
    })

    it('Produto deve ser excluído com sucesso', () => {
        ProdutoService.deleteProduto(userToken, productId).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.be.eq('Registro excluído com sucesso')
        })
    })
})