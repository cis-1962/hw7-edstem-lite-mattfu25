import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cookieSession from 'cookie-session';

import accountRouter from './routes/account';
import questionsRouter from './routes/questions';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const COOKIE_SECRET = process.env.COOKIE_SECRET || '';

// connect to mongodb
mongoose.connect(MONGODB_URI, {});

// start express app
const app = express();

// add cookie middleware
app.use(cookieSession({
  name: 'session',
  secret: COOKIE_SECRET,
  maxAge: 24 * 60 * 60 * 1000,
})); 

// add json parser middleware
app.use(express.json());

// add account router
app.use('/api/account', accountRouter);

// add questions router
app.use('/api/questions', questionsRouter);

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
