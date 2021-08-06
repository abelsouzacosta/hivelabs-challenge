import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import '@shared/typeorm'; // conexão com o banco de dados
import ApplicationError from '@errors/ApplicationError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

// middleware de tratamento de erros assíncronos
app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof ApplicationError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      stack: error.stack,
    });
  }

  return response.status(400).json({
    status: 'error',
    message: error.message,
    stack: error.stack,
  });
});

export default app;
