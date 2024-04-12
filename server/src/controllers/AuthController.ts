import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository";
import { NotFoundError, BadRequestError } from "../helpers/api-errors";

type JwtPayload = {
    id: number;
}

export class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError('E-mail e senha são obrigatórios');
        }
        
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            throw new NotFoundError('E-mail ou senha inválidos');
        }

        const verifyPass = await bcrypt.compare(password, user.password);

        if (!verifyPass) {
            throw new BadRequestError('E-mail ou senha inválidos');
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PASS ?? '',
            { expiresIn: '1h' }
        );
        
        const { password: _, ...userLogin } = user;
        return res.json({ 
            user: userLogin,
            token: token
         })
    }

    async logout(req: Request, res: Response) {

    }

    async getProfile(req: Request, res: Response) {
        return res.json(req.user);
    }
}