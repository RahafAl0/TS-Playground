import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();



const app: Express = express();
const port = '3000' || process.env.PORT;

app.use(cors())


app.get('/', (req: Request, res: Response) => {
  const username = req.query.username;
   
  if (username === "Rahaf"){
    return  res.json({ message: 'Hello Boss ' + username});

  }else{
   res.json({ message: 'Hello ' + username});

  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});