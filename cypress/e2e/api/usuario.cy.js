import UsuarioFactory from "../../factories/UsuarioFactory"
import UsuarioService from "../../pages/api/UsuarioService"

describe('CRUD Usuários - ServRest', () => {
    let userPayload
    let userCreateStatus
    let userResBody

    before(() => {
         userPayload = UsuarioFactory.createUser()

         UsuarioService.createUser(userPayload).then((res) => {
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
})