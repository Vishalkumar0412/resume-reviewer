import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.text());
app.use(cookieParser());

// CORS setup
const allowedOrigin = process.env.CLIENT_URL || '*';
console.log('Allowed Origin:', allowedOrigin);

// app.use(cors())

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Routes
app.use('/api/v1', router);

app.get('/test', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});