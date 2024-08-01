import express from 'express';
import AppDataSource from './db/data-source';
import authRoutes from './routes/auth';
import contactRoute from './routes/contact';

const app = express();

app.use(express.json());

app.use('/auth/member', authRoutes);
app.use('/contact', contactRoute);

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => console.log('Database connection error:', error));

export default app;
