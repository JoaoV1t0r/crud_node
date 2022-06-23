import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { CompaniesRepository } from '../Database/Repositories/Concrete/CompaniesRepository'

const db = new CompaniesRepository()
const companiesRouter = Router();
//companiesRouter.use(isAuthenticated);

companiesRouter.get('/getCompany', async (req, res) => {
    try{
        const company = await db.getCompanyByCnpj(req.body.cnpjCompany)
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
        await db.createCompany(company)
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
        if(await db.deleteCompany(req.body.cnpj) === true){
            return res.json({
                message: 'Sucess at /deleteCompany'
            }).status(200)
        }
        else if(await db.deleteCompany(req.body.cnpj) === false){
            return res.json({
                message: 'Error at /deleteCompany. '
            }).status(404)
        }
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
       if (await db.patchCompany(req.body.cnpj, req.body.companyData) === true){
        return res.json({
            message:'Sucess at /patchCompany',
            dataInserted: req.body.companyData
       }).status(200)
       }
       else if (await db.patchCompany(req.body.cnpj, req.body.companyData) === false){
        return res.json({
            message: 'Error at /patchCompany'
        }).status(404)
       }
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
        if(await db.send_base(req.body.data) === true){
            return res.json({
                message: 'Sucess at /send_base'
            }).status(200)
        }
        else if(await db.send_base(req.body.data) === false){
            return res.json({
                message: 'error at /send_base'
            })
        }
    }
    catch(error){
        return res.json({
            message: 'error at /send_base',
            error: error
        })
    }
})

export { companiesRouter };
