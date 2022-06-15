import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { FilesRepository } from '../Database/Repositories/Concrete/FilesRepository'

const db = new FilesRepository()
const filesRouter = Router();
filesRouter.use(isAuthenticated);

filesRouter.get('/getInfo', async (req, res) => {
    try{
        await db.getFileInformationByCnpj(req.body.cnpj)
        return res.send(200)
    }
    catch{
        throw new Error('An error has happened in the getFileInformation function')
    }
}) 

filesRouter.post('/saveInfo', async (req, res) => {
    try{
        db.saveInfoFromFile(req.body.data)
    }
    catch{
        throw new Error('An error has happened in the saveInfoFromFile function')
    }
})