import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { DatasetsRepository } from '../Database/Repositories/Concrete/DatasetsRepository'

const db = new DatasetsRepository()
const datasetsRouter = Router();

datasetsRouter.use(isAuthenticated);

datasetsRouter.post('/createDatabase', async (req, res) => {
  try {
    db.createDatabase(req.body.company_id)
    return(res.status(200))
  }
  catch(error){
    throw new Error('An error has happened in the createDatabase function.')
  }
});

datasetsRouter.post('/sendIncrement', async (req, res) => {
  try {
    db.sendIncrement(req.body.company_id, req.body.files)
    return(res.status(200))
  }
  catch(error){
    throw new Error('An error has happened in the sendIncrement function.')
  }
})

datasetsRouter.get('/getStatusFromModel', async (req, res) => {
  try{
    return res.json({
      model_status: db.getStatusFromModel(req.body.model_id)
    }).status(200)
  }
  catch(error){
    throw new Error('An error has happened in the getStatusFromModel function.')
  }
})

export { datasetsRouter };
