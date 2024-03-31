import express from 'express';
import dotenv from 'dotenv';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

// connect to database
mongoose.connect(process.env.MONGODB_URI, {});

const app = express();

app.use(express.json());

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
