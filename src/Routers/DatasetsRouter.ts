import { Router } from 'express';
import isAuthenticated from '../Middleware/isAuthenticated';
import { DatasetsRepository } from '../Database/Repositories/Concrete/DatasetsRepository'

const db = new DatasetsRepository()
const datasetsRouter = Router();

//datasetsRouter.use(isAuthenticated);

datasetsRouter.post('/createDatabase', async (req, res) => {
  let send: boolean
  try {
    send = await db.createDatabase(req.body.company_id)
    if(send === true){
      return res.json({
        message: 'Sucess at /createDatabase'
      }).status(200)
    }
    else if(send === false){
      return res.json({
        message: 'Error at /createDatabase'
      }).status(400)
    }
    
  }
  catch(error){
    return res.json({
      message: 'Error at /createDatabase',
      error: error
    }).status(400)
  }
});

datasetsRouter.post('/sendIncrement', async (req, res) => {
  let send: boolean
  try {
    send = await db.sendIncrement(req.body.company_id, req.body.files)
    if (send === true){
      return res.json({
        message: 'Sucess at /sendIncrement'
      }).status(200)
    }
    else if (send === false){
      return res.json({
        message: 'Error at /sendIncrement'
      }).status(400)
    }
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
