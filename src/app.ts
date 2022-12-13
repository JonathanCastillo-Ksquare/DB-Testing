// configuracion de express en su propio archivo
import express, { Application, Request, Response } from 'express';
import { TodoRouter } from './routes/Todo.routes';

const app: Application = express();

app.use(express.json());
app.use('/todos', TodoRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEE!');
})

export default app;