import { faker } from '@faker-js/faker/locale/pt_BR'

export default class UsuarioFactory {
    static createUser() {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'abcd1234',
            administrador: 'false'
        }
    }

    static createAdmin() {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'abcd1234',
            administrador: 'true'
        }
    }
}