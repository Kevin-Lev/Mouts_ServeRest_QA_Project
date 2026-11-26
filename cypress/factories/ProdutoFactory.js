import { faker } from '@faker-js/faker/locale/pt_BR'

export default class ProdutoFactory {
    static createProduto() {
        return {
            nome: faker.commerce.productName(),
            preco: faker.number.int({min: 1, max: 9999}),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 9999 })
        }
    }

    static createProdutoVazio() {
        return {
            nome: '',
            preco: null,
            descricao: '',
            quantidade: null
        }
    }
}