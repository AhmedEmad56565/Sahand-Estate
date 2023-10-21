import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use('*', notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`DB connected...`);
  })
  .catch((err) => {
    console.log(`message: ${err.message}`);
  });

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
