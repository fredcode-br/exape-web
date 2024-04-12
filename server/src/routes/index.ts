import { Router, Request, Response } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import quoteRoutes from "./quoteRoutes";

export default (app: any): void => {
    const routes = Router();
    
    routes.get('/', async(req: Request, res: Response) => {
        return res.json("Bem vindo a API de Seguros!");
    });

    app.use('/api/v1', 
        routes, 
        authRoutes,
        userRoutes,
        quoteRoutes
    );
}
