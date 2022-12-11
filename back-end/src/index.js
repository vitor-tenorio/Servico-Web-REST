import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './app/index.js';
import frontUrl from './config/urls.js';

const app = express();
app.disable('x-powered-by');

const port = process.env.NODE_ENV === 'production' ? 5000 : 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: frontUrl,
  }),
);

app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando no link http://localhost:${port}`);
});
