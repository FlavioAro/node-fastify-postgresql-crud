import * as User from './controllers';
import { Validator } from './validator';

module.exports = function (fastify:any, opts:any, next:any) {
    fastify.get('/user', User.reqSelectAll)
    fastify.get('/user/:userid', User.reqSelect)
    fastify.post('/user', Validator, User.reqInsert)
    fastify.put('/user/:userid', Validator, User.reqUpdate)
    fastify.delete('/user/:userid', User.reqDelete)
    next()
}