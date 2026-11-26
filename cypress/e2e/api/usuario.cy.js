import UsuarioFactory from "../../factories/UsuarioFactory"
import UsuarioService from "../../pages/api/UsuarioService"

describe('Usuários - ServRest', () => {
    let usuarioPayload
    let usuarioCreateStatus
    let usuarioResBody

    before(() => {
         usuarioPayload = UsuarioFactory.createUsuario()

         return UsuarioService.createUsuario(usuarioPayload).then((res) => {
             usuarioCreateStatus = res.status
             usuarioResBody = res.body
         })
    })

    it('Deve criar usuário com sucesso', () => {
        expect(usuarioCreateStatus).to.eq(201)
        expect(usuarioResBody._id).to.be.a('string')
        expect(usuarioResBody.message).to.eq("Cadastro realizado com sucesso")
    })

    it('Deve buscar o usuário criado pelo seu _id', () => {
        UsuarioService.getUsuarioById(usuarioResBody._id).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.nome).to.eq(usuarioPayload.nome)
            expect(res.body.email).to.eq(usuarioPayload.email)
            expect(res.body.password).to.eq(usuarioPayload.password)
            expect(res.body.administrador).to.eq(usuarioPayload.administrador)
        })
    })

    it('Deve buscar todos os usuários', () => {
        UsuarioService.getAllUsuarios().then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).to.be.gt(1)
            expect(res.body.usuarios).length.to.be.gt(1)
        })
    })

    it('Deve atualizar um usuário com sucesso', () => {
        const usuarioAtualizadoPayload = UsuarioFactory.createAdmin()

        UsuarioService.updateUsuario(usuarioResBody._id, usuarioAtualizadoPayload).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq("Registro alterado com sucesso")
        })
    })

    it('Deve excluir um usuário com sucesso', () => {
        UsuarioService.deleteUsuario(usuarioResBody._id).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq("Registro excluído com sucesso")
        })
    })

    it('E-mail duplicado deve retornar erro 400', () => {
        let usuarioPayload = UsuarioFactory.createUsuario()

        UsuarioService.createUsuario(usuarioPayload).then((res) => {
            expect(res.status).to.eq(201)
        }).then(() => {
            UsuarioService.createUsuario(usuarioPayload).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body).to.have.property('message', 'Este email já está sendo usado')
            })
        })
    })

    it('Usuário com ID menor que 16 caracteres retorna erro', () => {
        UsuarioService.getUsuarioById('a3kZ9mXp2rNqL7').then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('id', 'id deve ter exatamente 16 caracteres alfanuméricos')
        })
    })

    it('Usuário com ID de usuário inexistente retorna erro', () => {
        UsuarioService.getUsuarioById(usuarioResBody._id).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('message', 'Usuário não encontrado')
        })
    })

    it('Usuário com e-mail com formatação inválida retorna erro', () => {
        const usuarioEmailInvalido = UsuarioFactory.createUsuarioEmailInvalido()

        UsuarioService.createUsuario(usuarioEmailInvalido).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('email', 'email deve ser um email válido')
        })
    })
})
