import { Ds } from "../entity/Ds"
import { getRepository } from "typeorm"

export const validator = {
    schema: {
        body: {
            type: 'object',
            required: ['userid' ,'dsname', 'dsprefix'],
            properties: {
                userid: { type: 'number' },
                dsname: { type: 'string' },
                dsprefix: { type: 'string' }
            }
        }
    }
}

export const index = async (req: any, reply: any) => {
    const ds = await getRepository(Ds).find()
    return ds ? reply.code(200).send(ds) : reply.code(400).send(new Error('Ds não encontrado'))
}

export const show = async (req: any, reply: any) => {
    const ds = await getRepository(Ds).findOne({userid: req.params.userid})
    return ds ? reply.code(200).send(ds) : reply.code(400).send(new Error('Ds não encontrado'))
}

export const store = async (req: any, reply: any) => {
    const validate = await getRepository(Ds).findOne({userid: req.body.userid})
    if(validate) {
        reply.code(400).send(new Error('Já existe um ds cadastrado com o userid: '+req.body.userid))
    }else {
        const ds = await getRepository(Ds)
        .insert([
            { 
                userid: req.body.userid, 
                dsname: req.body.dsname,
                dsprefix: req.body.dsprefix,
                disabled: req.body.disabled,
                hidden: req.body.hidden
            }
        ])
    
        return ds.raw[0].id ? reply.code(200).send({message: "Ds cadastrado com sucesso"}) : reply.code(400).send(new Error('Erro ao cadastrar ds'))
    }
}

export const update = async (req: any, reply: any) => {
    const update = await getRepository(Ds).update({userid: req.params.userid}, 
            {
                userid: req.body.userid, 
                dsname: req.body.dsname,
                dsprefix: req.body.dsprefix,
                disabled: req.body.disabled,
                hidden: req.body.hidden
            })

    return update.affected ? reply.code(200).send({message: "Dados atualizados com sucesso"}) : reply.code(400).send(new Error('Ds não encontrado'))
    
}

export const destroy = async (req: any, reply: any) => {
    const destroy = await getRepository(Ds).delete({userid: req.params.userid})

    return destroy.affected ? reply.code(200).send({message: "Ds apagado com sucesso"}) : reply.code(400).send(new Error('Ds não encontrado'))
}