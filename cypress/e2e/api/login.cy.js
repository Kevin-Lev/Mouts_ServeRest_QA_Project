import UsuarioFactory from "../../factories/UsuarioFactory"
import UsuarioService from "../../pages/api/UsuarioService"

describe('Login - ServRest', () => {
    let userPayload

    before(() => {
        userPayload = UsuarioFactory.createUser()

        UsuarioService.createUser(userPayload)
    })

    it('Login com Sucesso ao inserir credenciais válidas', () => {
        UsuarioService.loginUser(userPayload.email, userPayload.password).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('message', 'Login realizado com sucesso')
            expect(res.body).to.have.property('authorization').include('Bearer')
        })
    })

    it('Falha no login quando credenciais são inválidas', () => {
        UsuarioService.loginUser('email@qualquer.com', '555frev$').then((res) => {
            expect(res.status).to.eq(401)
            expect(res.body).to.have.property('message', 'Email e/ou senha inválidos')
        })
    })

    it('Falha no login quando e-mail ou senha estão vazios', () => {
        UsuarioService.loginUser(null, null).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('password', 'password deve ser uma string')
            expect(res.body).to.have.property('email', 'email deve ser uma string')
        })
    })

    it('Falha no login quando e-mail ou senha estão em branco', () => {
        UsuarioService.loginUser('', '').then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('password', 'password não pode ficar em branco')
            expect(res.body).to.have.property('email', 'email não pode ficar em branco')
        })
    })
})