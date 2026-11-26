import ProdutoFactory from "../../factories/ProdutoFactory"
import UsuarioFactory from "../../factories/UsuarioFactory"
import ProdutoService from "../../pages/api/ProdutoService"
import UsuarioService from "../../pages/api/UsuarioService"


describe('Produtos - ServerRest', () => {
    let usuarioPayload
    let produtoPayload
    let usuarioToken
    let produtoId

    before(() => {
        produtoPayload = ProdutoFactory.createProduto()
        usuarioPayload = UsuarioFactory.createAdmin()

        return UsuarioService.createUsuario(usuarioPayload).then(() => {
            UsuarioService.loginUsuario(usuarioPayload.email, usuarioPayload.password).then((res) => {
                usuarioToken = res.body.authorization
            })
        })
    })

    it('Produto deve ser criado com sucesso', () => {
        ProdutoService.createProduto(usuarioToken, produtoPayload).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body._id).to.be.a('string').and.to.have.length(16)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')

            produtoId = res.body._id
        })
    })

    it('Todos os produtos devem ser listados', () => {
        ProdutoService.getAllProdutos().then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).to.be.gte(1)
            expect(res.body.produtos).to.have.length.gte(1)
        })
    })

    it('Busca de produto específico deve ser retornada com sucesso', () => {
        ProdutoService.getProduto(produtoId).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body._id).to.be.eq(produtoId)
            expect(res.body.descricao).to.be.a('string')
            expect(res.body.preco).to.be.a('number')
            expect(res.body.quantidade).to.be.a('number')
        })
    })

    it('Produto com nome duplicado deve ocasionar falha', () => {
        const novoProdutoPayload = {...ProdutoFactory.createProduto(), nome: produtoPayload.nome}

        ProdutoService.createProduto(usuarioToken, novoProdutoPayload).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('Já existe produto com esse nome')
        })
    })

    it('Busca de produtos deve falhar quando preco não é número', () => {
        ProdutoService.getAllProdutos({ preco: 'R$ 159' }).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.preco).to.eq('preco deve ser um número')
        })
    })

    it('Busca de produto deve falhar quando o ID não existe', () => {
        ProdutoService.getProduto('A3kR9mZx2Lp7QwT4').then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.eq('Produto não encontrado')
        })
    })

    it('Falha ao atualizar produto com nome já utilizado', () => {
        const novoProdutoPayload = ProdutoFactory.createProduto()
        const produtoAtualizadoPayload = { ...ProdutoFactory.createProduto(), nome: novoProdutoPayload.nome }

        ProdutoService.createProduto(usuarioToken, novoProdutoPayload).then(() => {
            ProdutoService.updateProduto(usuarioToken, produtoId, produtoAtualizadoPayload).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body.message).to.eq('Já existe produto com esse nome')
            })
        })
    })

    it('Produto deve ser atualizado com sucesso', () => {
        const produtoAtualizadoPayload = ProdutoFactory.createProduto()

        ProdutoService.updateProduto(usuarioToken, produtoId, produtoAtualizadoPayload).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq('Registro alterado com sucesso')
        })
    })

    it('Deleção de produto sem token de autenticação deve ser proibida ', () => {
        ProdutoService.deleteProduto(null, produtoId).then((res) => {
            expect(res.status).to.eq(401)
            expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Produto deve ser excluído com sucesso', () => {
        ProdutoService.deleteProduto(usuarioToken, produtoId).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.be.eq('Registro excluído com sucesso')
        })
    })
})
