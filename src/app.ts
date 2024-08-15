import express from 'express';
import AppDataSource from './db/data-source';
import authRoutes from './routes/auth';
import contactRoute from './routes/contact';
import projectRoutes from './routes/project';
import eventRoutes from './routes/event';

const app = express();
global.__basepath = __dirname;

app.use(express.json());

app.use('/auth/member', authRoutes);
app.use('/contact', contactRoute);
app.use('/api/project', projectRoutes);
app.use('/api/event', eventRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => console.log('Database connection error:', error));

export default app;
