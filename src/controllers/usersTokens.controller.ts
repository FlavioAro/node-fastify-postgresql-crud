import { UsersTokens } from "../entity/UsersTokens"
import { getRepository } from "typeorm"

export const validator = {
    schema: {
        body: {
            type: 'object',
            required: ['userid' ,'status', 'tokens'],
            properties: {
                userid: { type: 'number' },
                status: { type: 'number' },
                tokens: { 
                    type: 'array',
                    required: ['name', 'values'],
                    properties: {
                        name: { type: 'string' },
                        values: { type: 'object' }
                    }
                }
            }
        }
    }
}

export const index = async (req: any, reply: any) => {
    const user_tokens = await getRepository(UsersTokens).find()
    return user_tokens ? reply.code(200).send(user_tokens) : reply.code(400).send(new Error('userTokens não encontrado'))
}

export const show = async (req: any, reply: any) => {
    const user_token = await getRepository(UsersTokens).findOne({userid: req.params.userid})
    return user_token ? reply.code(200).send(user_token) : reply.code(400).send(new Error('userToken não encontrad'))
}

export const store = async (req: any, reply: any) => {
    const validate = await getRepository(UsersTokens).findOne({userid: req.body.userid})
    if(validate) {
        reply.code(400).send(new Error('Já existe um userToken cadastrado com o userid: '+req.body.userid))
    }else {
        const user_token = await getRepository(UsersTokens)
        .insert([
            { 
                userid: req.body.userid, 
                status: req.body.status,
                tokens: req.body.tokens,
                disabled: req.body.disabled,
                hidden: req.body.hidden
            }
        ])
    
        return user_token.raw[0].id ? reply.code(200).send({message: "userToken cadastrado com sucesso"}) : reply.code(400).send(new Error('Erro ao cadastrar userToken'))
    }
}

export const update = async (req: any, reply: any) => {
    const update = await getRepository(UsersTokens).update({userid: req.params.userid}, 
            {
                userid: req.body.userid, 
                status: req.body.status,
                tokens: req.body.tokens,
                disabled: req.body.disabled,
                hidden: req.body.hidden
            })

    return update.affected ? reply.code(200).send({message: "Dados atualizados com sucesso"}) : reply.code(400).send(new Error('userToken não encontrado'))
    
}

export const destroy = async (req: any, reply: any) => {
    const destroy = await getRepository(UsersTokens).delete({userid: req.params.userid})

    return destroy.affected ? reply.code(200).send({message: "userToken apagado com sucesso"}) : reply.code(400).send(new Error('userToken não encontrado'))
}