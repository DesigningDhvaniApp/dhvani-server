import express from 'express';
import AppDataSource from './db/data-source';
import referenceRoutes from './routes/references'

const app = express();

app.use(express.json());

app.use('/references', referenceRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => console.log('Database connection error:', error));

export default app;