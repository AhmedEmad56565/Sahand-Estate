import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const app = express();

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
