import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { CompaniesRepository } from '../Database/Repositories/Concrete/CompaniesRepository'

const db = new CompaniesRepository()
const companiesRouter = Router();
companiesRouter.use(isAuthenticated);

companiesRouter.get('/getCompany', async (req, res) => {
    try{
        const company = db.getCompanyByCnpj(req.body.cnpjCompany)
        return res.json({
            company: company,
            message: 'Sucess at /getCompany'
        }).status(200)
    }
    catch(error){
        return res.json({
            error: error,
            message: 'Error at /getCompany'
        }).status(404)
    }
})

companiesRouter.post('/createCompany', async (req, res) => {
    try{
        const company = await db.sendCompanyAndGetCompany_id(req.body.companyData)
        db.createCompany(company)
        return res.json({
            message: 'Sucess at /createCompany'
        }).status(200)
    }
    catch(error){
        return res.json({
            error: error,
            message: 'Error at /createCompany'
        })
    }
})

companiesRouter.delete('/deleteCompany', async (req, res) => {
    try{
        await db.deleteCompany(req.body.cnpj)
        return res.json({
            message: 'Sucess at /deleteCompany'
        })
    }
    catch(error){
        return res.json({
            message: 'Error at /deleteCompany',
            error: error
        }).status(400)
    }
})

companiesRouter.put('/patchCompany', async (req, res) => {
    try{
       await db.patchCompany(req.body.cnpj, req.body.companyData)
       return res.json({
            message:'Sucess at /patchCompany',
            dataInserted: req.body.companyData
       }).status(200)
    }
    catch(error){
        return res.json({
            message: "Error at /patchCompany",
            error: error
        }).status(404)
    }
})

companiesRouter.post('/send_base', async (req, res) => {
    try{
        await db.send_base(req.body.data)
        return res.json({
            message: 'Sucess at /send_base'
        }).status(200)
    }
    catch(error){
        return res.json({
            message: 'error at /send_base',
            error: error
        })
    }
})

export { companiesRouter };
