class UsuarioPage {

    clicaBotaoListaCompras() {
        cy.get('[data-testid="lista-de-compras"]').click()
    }

    clicaBotaologout() {
        cy.get('[data-testid="logout"]').click()
    }

    pesquisarProduto(nome) {
        cy.get('[data-testid="pesquisar"]').type(nome)
    }

    clicaBotaoPesquisar() {
        cy.get('[data-testid="botaoPesquisar"]').click()
    }

    abrirDetalhesProduto() {
        cy.get('[data-testid="product-detail-link"]').first().click()
    }

    clicaAdicionarNaLista() {
        cy.get('[data-testid="adicionarNaLista"]').click()
    }

    clicaCarrinho() {
        cy.get('[data-testid="shopping-cart-button"]').click()
    }

    voltarHome() {
        cy.get('[data-testid="voltarHome"]').click()
    }

    clicaAdicionarCarrinho() {
        cy.get('[data-testid="adicionar carrinho"]').click()
    }

    limparListaCompras() {
        cy.get('[data-testid="limparLista"]').click()
    }

    aumentarQuantidadeProduto() {
        cy.get('[data-testid="product-increase-quantity"]').click()
    }

    diminuirQuantidadeProduto() {
        cy.get('[data-testid="product-decrease-quantity"]').click()
    }
}

export default new UsuarioPage()
