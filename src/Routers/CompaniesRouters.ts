import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { CompaniesRepository } from '../Database/Repositories/Concrete/CompaniesRepository'

const db = new CompaniesRepository()
const companiesRouter = Router();
companiesRouter.use(isAuthenticated);

companiesRouter.get('/getCompanyByCnpj', async (req, res) => {
    return db.getCompanyByCnpj(req.body.cnpjCompany)
})

companiesRouter.post('/createCompany', async (req, res) => {
    const company = await db.sendCompanyAndGetCompany_id(req.body.companyData)
    db.createCompany(company)
})

companiesRouter.delete('/deleteCompany', async (req, res) => {
    try{
        await db.deleteCompany(req.body.cnpj)
        return res.send(200)
    }
    catch{
        throw new Error('An error has happened in the deleteCompany function')
    }
})

companiesRouter.put('/patchCompany', async (req, res) => {
    try{
       await db.patchCompany(req.body.cnpj, req.body.companyData)
       return res.send(200)
    }
    catch{
        throw new Error('An error has happened in the patchCompany function')
    }
})

companiesRouter.post('/send_base', async (req, res) => {
    try{
        db.send_base(req.body.data)
    }
    catch{
        throw new Error('An erro has happened in the send_base function')
    }
})

export { companiesRouter };
