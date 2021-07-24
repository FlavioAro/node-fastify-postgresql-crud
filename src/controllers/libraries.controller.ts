import { Libraries } from "../entity/Libraries"
import { getRepository } from "typeorm"

export const validator = {
    schema: {
        body: {
            type: 'object',
            required: ['userid' ,'status'],
            properties: {
                userid: { type: 'number' },
                status: { type: 'number' }
            }
        }
    }
}

export const index = async (req: any, reply: any) => {
    const libraries = await getRepository(Libraries).find()
    return libraries ? reply.code(200).send(libraries) : reply.code(400).send(new Error('Nenhuma librarie não encontrada'))
}

export const show = async (req: any, reply: any) => {
    const librarie = await getRepository(Libraries).findOne({userid: req.params.userid})
    return librarie ? reply.code(200).send(librarie) : reply.code(400).send(new Error('Librarie não encontrada'))
}

export const store = async (req: any, reply: any) => {
    const validate = await getRepository(Libraries).findOne({userid: req.body.userid})
    if(validate) {
        reply.code(400).send(new Error('Já existe uma librarie cadastrada com o userid: '+req.body.userid))
    }else {
        const librarie = await getRepository(Libraries)
        .insert([
            { 
                userid: req.body.userid, 
                status: req.body.status,
                components: req.body.components,
                disabled: req.body.disabled,
                hidden: req.body.hidden
            }
        ])
    
        return librarie.raw[0].id ? reply.code(200).send({message: "Librarie cadastrada com sucesso"}) : reply.code(400).send(new Error('Erro ao cadastrar librarie'))
    }
}

export const update = async (req: any, reply: any) => {
    const update = await getRepository(Libraries).update({userid: req.params.userid}, 
            {
                userid: req.body.userid, 
                status: req.body.status,
                components: req.body.components,
                disabled: req.body.disabled,
                hidden: req.body.hidden
            })

    return update.affected ? reply.code(200).send({message: "Dados atualizados com sucesso"}) : reply.code(400).send(new Error('Librarie não encontrada'))
    
}

export const destroy = async (req: any, reply: any) => {
    const destroy = await getRepository(Libraries).delete({userid: req.params.userid})

    return destroy.affected ? reply.code(200).send({message: "Librarie apagada com sucesso"}) : reply.code(400).send(new Error('Librarie não encontrada'))
}