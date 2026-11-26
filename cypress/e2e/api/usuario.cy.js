import UsuarioFactory from "../../factories/UsuarioFactory"
import UsuarioService from "../../pages/api/UsuarioService"

describe('Usuários - ServRest', () => {
    let userPayload
    let userCreateStatus
    let userResBody

    before(() => {
         userPayload = UsuarioFactory.createUser()

         return UsuarioService.createUser(userPayload).then((res) => {
             userCreateStatus = res.status
             userResBody = res.body
         })
    })

    it('Deve criar usuário com sucesso', () => {
        expect(userCreateStatus).to.eq(201)
        expect(userResBody._id).to.be.a('string')
        expect(userResBody.message).to.eq("Cadastro realizado com sucesso")
    })

    it('Deve buscar o usuário criado pelo seu _id', () => {
        UsuarioService.getUserById(userResBody._id).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.nome).to.eq(userPayload.nome)
            expect(res.body.email).to.eq(userPayload.email)
            expect(res.body.password).to.eq(userPayload.password)
            expect(res.body.administrador).to.eq(userPayload.administrador)
        })
    })

    it('Deve buscar todos os usuários', () => {
        UsuarioService.getAllUsers().then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.quantidade).to.be.gt(1)
            expect(res.body.usuarios).length.to.be.gt(1)
        })
    })

    it('Deve atualizar um usuário com sucesso', () => {
        const updatedUserData = UsuarioFactory.createAdmin()

        UsuarioService.updateUser(userResBody._id, updatedUserData).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq("Registro alterado com sucesso")
        })
    })

    it('Deve excluir um usuário com sucesso', () => {
        UsuarioService.deleteUser(userResBody._id).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.message).to.eq("Registro excluído com sucesso")
        })
    })

    it('E-mail duplicado deve retornar erro 400', () => {
        let userPayload = UsuarioFactory.createUser()

        UsuarioService.createUser(userPayload).then((res) => {
            expect(res.status).to.eq(201)
        }).then(() => {
            UsuarioService.createUser(userPayload).then((res) => {
                expect(res.status).to.eq(400)
                expect(res.body).to.have.property('message', 'Este email já está sendo usado')
            })
        })
    })

    it('Usuário com ID menor que 16 caracteres retorna erro', () => {
        UsuarioService.getUserById('a3kZ9mXp2rNqL7').then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('id', 'id deve ter exatamente 16 caracteres alfanuméricos')
        })
    })

    it('Usuário com ID de usuário inexistente retorna erro', () => {
        UsuarioService.getUserById(userResBody._id).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('message', 'Usuário não encontrado')
        })
    })

    it('Usuário com e-mail com formatação inválida retorna erro', () => {
        const userInvalidEmail = UsuarioFactory.createUserInvalidEmail()

        UsuarioService.createUser(userInvalidEmail).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body).to.have.property('email', 'email deve ser um email válido')
        })
    })
})