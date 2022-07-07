import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { FilesRepository } from '../Database/Repositories/Concrete/FilesRepository'

const db = new FilesRepository()
const filesRouter = Router();
//filesRouter.use(isAuthenticated);

filesRouter.get('/getInfo', async (req, res) => {
    try{
        const info = await db.getFileInformationByCnpj(req.body.cnpj)
        return res.json({
            message: 'Sucess at /getInfo',
            info: info
        })
    }
    catch(error){
        return res.json({
            message: 'Error at /getInfo',
            error: error
        })
    }
}) 

filesRouter.post('/saveInfo', async (req, res) => {
    try{
        if(await db.saveInfoFromFile(req.body.data) === true){
            return res.json({
                message: 'Sucess at /saveInfo'
            }).status(200)
        }
        else if(await db.saveInfoFromFile(req.body.data) === false){
            return res.json({
                message: 'Error at /saveInfo'
            }).status(400)
        }    
    }
    catch(error){
        return res.json({
            message: 'Error at /saveInfo',
            error: error
        })
    }
})

export { filesRouter };
