import { Imagens } from './model';
import { getRepository } from 'typeorm';
import AWS from 'aws-sdk';
import * as crypto from 'crypto';

const s3 = new AWS.S3({
    accessKeyId: (process.env.AWS_ACCESS_KEY_ID as string),
    secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY as string),
    region: (process.env.AWS_DEFAULT_REGION as string)
})

export const reqSelectAll = async (req: any, reply: any) => {
    const imagens = await getRepository(Imagens).createQueryBuilder("imagens").getMany()
    return imagens ? reply.code(200).send(imagens) : reply.code(400).send(new Error('Nenhuma imagem encontrada'))
}

export const reqSelect = async (req: any, reply: any) => {
    const imagem = await getRepository(Imagens).findOne({ where:{ id: req.params.id }})
    return imagem ? reply.code(200).send(imagem) : reply.code(400).send(new Error('Imagem não encontrada'))
}

export const reqInsert = async (req: any, reply: any) => {
    const { file, filename, mimetype } = await req.file()
    const valid = ["image/jpeg","image/pjpeg","image/png","image/gif"].indexOf(mimetype)

    if(valid !== -1) {
        crypto.randomBytes(16, (err: any, hash: any) => {
            const params = {
                Bucket: (process.env.AWS_BUCKET_NAME as string),
                Key: hash.toString("hex")+'-'+filename,
                Body: file,
                ContentType: mimetype,
                ACL: 'public-read'
            }
            
            s3.upload(params, async (err: any, data: any) => {
                if(err) {
                    return reply.code(400).send(new Error('Erro ao fazer upload'));
                }
        
                const img = await getRepository(Imagens)
                .insert([
                    { 
                        url: data.Location,
                        filename: hash.toString("hex")+'-'+filename
                    }
                ])
            
                return img.raw[0].id ? reply.code(200).send({url: data.Location}) : reply.code(400).send(new Error('Erro ao cadastrar imagem'))
            })
        });
    } else {
        return reply.code(400).send(new Error('Formato não suportado. Formatos aceitos: jpeg, pjpeg, png, gif.'))
    }

}

export const reqDelete = async (req: any, reply: any) => {
    const imagem = await getRepository(Imagens).findOne({ where:{ id: req.params.id }})

    if(imagem) {
        const params = {
            Bucket: (process.env.AWS_BUCKET_NAME as string),
            Key: imagem.filename
        }

        s3.deleteObject(params, async (err: any, data: any) => {
            if(err) {
                return reply.code(400).send(new Error('Erro ao excluir imagem'));
            }
            const destroy = await getRepository(Imagens).delete({ id: req.params.id})
            return destroy.affected ? reply.code(200).send({message: "Imagem apagada com sucesso"}) : reply.code(400).send(new Error('Imagem não encontrada'))
        })
    }else {
        return reply.code(400).send(new Error('Imagem não encontrada'));
    }
}