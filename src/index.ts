import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
const app: Application = express();
import dotenv from 'dotenv'
dotenv.config();
import { connectMongo } from './app/config/mongoConnection';
const PORT = process.env.PORT;
import { routes } from './app/index.routes';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Server up and running',
  });
});
app.use('/api/v1', routes);

try {
  connectMongo()
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
