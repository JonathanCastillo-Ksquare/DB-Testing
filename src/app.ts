// configuracion de express en su propio archivo
import express, { Application, Request, Response } from 'express';
import { TodoRouter } from './routes/Todo.routes';
import { UserRouter } from './routes/User.routes';

const app: Application = express();

app.use(express.json());
app.use('/todos', TodoRouter);
//Firebase
app.use('/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEE!');
})

export default app;