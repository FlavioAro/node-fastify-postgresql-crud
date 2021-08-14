import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Fastify, { FastifyInstance } from 'fastify';

require("dotenv").config();

createConnection()
const server: FastifyInstance = Fastify({})

server.register(require('fastify-multipart'))

server.get('/', async (request, reply) => {
    return { message: "Access one of the following endpoints: users, upload" }
})

server.register(require('./api/components/users/routes'))
server.register(require('./api/components/upload/routes'))

const start = async () => {
    try {
        await server.listen((process.env.SERVER_PORT as string))

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

    } catch (err) {
        server.log.error(err)
    }
}
start()