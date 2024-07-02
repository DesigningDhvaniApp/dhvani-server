import express from 'express';
import AppDataSource from './db/data-source';
import referenceRoutes from './routes/references'
import authRoutes from './routes/auth'

const app = express();

app.use(express.json());

app.use('/auth', authRoutes)
app.use('/references', referenceRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => console.log('Database connection error:', error));

export default app;