import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import router from './routes';
import '@shared/typeorm'; // conexão com o banco de dados

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

export default app;
