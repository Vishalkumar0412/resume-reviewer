import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors'

import cookieParser from 'cookie-parser'


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(express.text())
app.use(cookieParser())
console.log(process.env.CLIENT_URL);

app.use(cors({
  credentials:true,
  origin:process.env.CLIENT_URL
}))
app.use('/api/v1',router);


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});