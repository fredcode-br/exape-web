import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.post('/usuario', new UserController().create);

userRoutes.use(authMiddleware);

userRoutes
    .delete('/usuario/:id', new UserController().delete)
    .get('/usuario/:id', new UserController().getUser);

export default userRoutes;
