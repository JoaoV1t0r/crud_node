import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { DatasetsRepository } from '../Database/Repositories/Concrete/DatasetsRepository'

const db = new DatasetsRepository()
const datasetsRouter = Router();

datasetsRouter.use(isAuthenticated);

datasetsRouter.post('/createDatabase', async (req, res) => {
  try {
    await db.createDatabase(req.body.company_id)
    return res.json({
      message: 'Sucess at /createDatabase'
    })
  }
  catch(error){
    return res.json({
      message: 'Error at /createDatabase',
      error: error
    })
  }
});

datasetsRouter.post('/sendIncrement', async (req, res) => {
  try {
    await db.sendIncrement(req.body.company_id, req.body.files)
    return res.json({
      message: 'Sucess at /sendIncrement'
    })
  }
  catch(error){
    return res.json({
      message: 'Error at /sendIncrement',
      error: error
    })
  }
})

datasetsRouter.get('/getStatusFromModel', async (req, res) => {
  try{
    const status = await db.getStatusFromModel(req.body.model_id)
    return res.json({
      message: 'Sucess at at /getStatusFromModel',
      model_status: status
    }).status(200)
  }
  catch(error){
    return res.json({
      message: 'Error at /getStatusFromModel',
      error: error
    })
  }
})

export { datasetsRouter };
