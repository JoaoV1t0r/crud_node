import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { companiesRouter } from "./src/Routers/CompaniesRouter";
import { datasetsRouter } from "./src/Routers/DatasetsRouter";
import { filesRouter } from "./src/Routers/FilesRouter";
import { usersRouter } from "./src/Routers/UsersRouter";

const app = express();

dotenv.config();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use("/companies", companiesRouter);
app.use("/files", filesRouter)
app.use("/datasets", datasetsRouter)
app.use("/users", usersRouter)
app.listen(3002, ()=>{
  console.log("running on 3002");
})
