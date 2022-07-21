import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { CompaniesRepository } from '../Database/Repositories/Concrete/CompaniesRepository';
import { v4 as uuid } from 'uuid';

const db = new CompaniesRepository();
const companiesRouter = Router();
//companiesRouter.use(isAuthenticated);

companiesRouter.get('/getCompany', async (req, res) => {
  try {
    const company = await db.getCompanyByCnpj(req.body.cnpjCompany);
    return res
      .json({
        company: company,
        message: 'Sucess at /getCompany',
      })
      .status(200);
  } catch (error) {
    return res
      .json({
        error: error,
        message: 'Error at /getCompany',
      })
      .status(404);
  }
});

companiesRouter.get('/getAllCompanies', async (req, res) => {
  try {
    const allCompanies = await db.getAllCompanies();
    return res.json({
      companies: allCompanies,
      message: 'Sucess at /getAllCompanies',
    });
  } catch (error) {
    return res.json({
      returnFromFunction: error,
      message: 'Sucess at /getAllCompanies',
    });
  }
});

companiesRouter.post('/createCompany', async (req, res) => {
  //console.log(req.body.companyData)
  try {
    //await db.TestcreateCompany(req.body.companyData)
    const company = await db.sendCompanyAndGetCompany_id(req.body.companyData);
    const dbcompany = await db.createCompany({
      name: company.data.name,
      cnpj: company.data.cnpj,
      email: company.data.email,
      password: company.data.password,
      company_id: company.data.id,
      uuid: uuid(),
    });
    //console.log('Retorno aws:', company.data);
    return res
      .json({
        message: 'Sucess at /createCompany',
        returnFromFunction: dbcompany,
      })
      .status(200);
  } catch (error) {
    return res
      .json({
        error: error,
        message: 'Error at /createCompany',
      })
      .status(400);
  }
});

companiesRouter.delete('/deleteCompany/:cnpj', async (req, res) => {
  try {
    if ((await db.deleteCompany(req.params.cnpj)) === true) {
      return res
        .json({
          message: 'Sucess at /deleteCompany',
        })
        .status(200);
    } else if ((await db.deleteCompany(req.params.cnpj)) === false) {
      return res
        .json({
          message: 'Error at /deleteCompany. ',
        })
        .status(404);
    }
  } catch (error) {
    return res
      .json({
        message: 'Error at /deleteCompany',
        error: error,
      })
      .status(400);
  }
});

companiesRouter.put('/patchCompany', async (req, res) => {
  console.log('patch router:', req.body);
  try {
    if ((await db.patchCompany(req.body.cnpj, req.body.companyData.name)) === true) {
      return res
        .json({
          message: 'Sucess at /patchCompany',
          dataInserted: req.body.companyData,
        })
        .status(200);
    } else if ((await db.patchCompany(req.body.cnpj.empresa, req.body.name)) === false) {
      return res
        .json({
          message: 'Error at /patchCompany',
        })
        .status(404);
    }
  } catch (error) {
    return res
      .json({
        message: 'Error at /patchCompany',
        error: error,
      })
      .status(404);
  }
});

companiesRouter.post('/send_base', async (req, res) => {
  try {
    if ((await db.send_base(req.body.data)) === true) {
      return res
        .json({
          message: 'Sucess at /send_base',
        })
        .status(200);
    } else if ((await db.send_base(req.body.data)) === false) {
      return res.json({
        message: 'error at /send_base',
      });
    }
  } catch (error) {
    return res.json({
      message: 'error at /send_base',
      error: error,
    });
  }
});

export { companiesRouter };
