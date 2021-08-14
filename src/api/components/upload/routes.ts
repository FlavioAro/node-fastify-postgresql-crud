import * as Upload from './controllers';

module.exports = function (fastify:any, opts:any, next:any) {
    fastify.get('/upload', Upload.reqSelectAll)
    fastify.get('/upload/:id', Upload.reqSelect)
    fastify.post('/upload', Upload.reqInsert)
    fastify.delete('/upload/:id', Upload.reqDelete)
    next()
}