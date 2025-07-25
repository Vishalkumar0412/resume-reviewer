import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import router from './routes';

import cookieParser from 'cookie-parser'


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1',router);


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});