import { Router, Request, Response } from "express";
import { createUser, readUser, getAllUsers, updateUser, disableUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

export const UserRouter = Router();

//Si quiero que todas mis rutas esten protegidas puedo poner el middleware a nivel del router
//UserRoutees.use(isAuthenticated)

UserRouter.post('/newUser', async (req: Request, res: Response) => {
    //Info desde el body
    //Checar si falta info
    //Checar que el rol sea adecuado
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }

    try {
        const userId = await createUser(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        })
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' });
    }
})

UserRouter.get('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {
    // Dos formas de obtener el userId
    //1ra forma
    const { userId } = req.params;
    //2da forma
    const { uid } = res.locals;

    try {
        const user = await readUser(userId);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });

    }

})