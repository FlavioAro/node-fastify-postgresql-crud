import "reflect-metadata"
import { createConnection } from "typeorm"
import Fastify, { FastifyInstance } from 'fastify'
import * as User from './controllers/users.controller'
import * as Librarie from './controllers/libraries.controller'
import * as UserToken from './controllers/usersTokens.controller'
import * as Ds from './controllers/ds.controller'

createConnection()
const server: FastifyInstance = Fastify({})

server.get('/', async (request, reply) => {
    return { message: "Acesse um dos seguintes endpoints: users, libraries, brandtokens, globaltokens, ds" }
})

server.get('/user', User.index)
server.post('/user', User.validator, User.store)
server.get('/user/:userid', User.show)
server.put('/user/:userid', User.validator, User.update)
server.delete('/user/:userid', User.destroy)

server.get('/ds', Ds.index)
server.post('/ds', Ds.validator, Ds.store)
server.get('/ds/:userid', Ds.show)
server.put('/ds/:userid', Ds.validator, Ds.update)
server.delete('/ds/:userid', Ds.destroy)

server.get('/libraries', Librarie.index)
server.post('/libraries', Librarie.validator, Librarie.store)
server.get('/libraries/:userid', Librarie.show)
server.put('/libraries/:userid', Librarie.validator, Librarie.update)
server.delete('/libraries/:userid', Librarie.destroy)

server.get('/brandtokens', UserToken.index)
server.post('/brandtokens', UserToken.validator, UserToken.store)
server.get('/brandtokens/:userid', UserToken.show)
server.put('/brandtokens/:userid', UserToken.validator, UserToken.update)
server.delete('/brandtokens/:userid', UserToken.destroy)

server.get('/globaltokens', async (request, reply) => {
    return {}
})

const start = async () => {
    try {
        await server.listen(3000)

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

    } catch (err) {
        server.log.error(err)
    }
}
start()