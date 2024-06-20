import express from 'express';
import AppDataSource from './db/data-source';

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => console.log('Database connection error:', error));

export default app;