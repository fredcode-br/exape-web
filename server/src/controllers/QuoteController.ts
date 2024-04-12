import { Request, Response } from "express";
import { quoteRepository } from "../repositories/quoteRepository";
import { NotFoundError, BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";

export class QuoteController {
    async process(req: Request, res: Response) {
        const {
            name,
            description,
            condition,
            value
        } = req.body;
    
        if (!name || !description || !condition || !value) {
            throw new BadRequestError('Todos os campos são obrigatórios');
        }
    
        let installments = []; 
    
        let insuranceValue = 0; 

            if (condition !== "Novo" && condition !== "Reformado" && condition !== "Antigo") {
                throw new BadRequestError('Condição');
            }

            if (isNaN(Number(value))) {
                throw new BadRequestError('O valor do imóvel deve ser um número');
            }
    
            switch (condition) {
                case "Novo":
                    insuranceValue = value * 0.02;
                    break;
                case "Reformado":
                    insuranceValue = value * 0.04;
                    break;
                case "Antigo":
                    insuranceValue = value * 0.06;
                    break;
                default:
                    throw new Error('Condição inválida');
            }
        
        const installmentsNumber = 12;
        const installmentsValue = insuranceValue/12;
        
    
        const quote = {
            name,
            description,
            condition,
            value,
            insuranceValue,
            installmentsNumber,
            installmentsValue
        };
    
        return res.json(quote);
    }
    
    async save(req: Request, res: Response) {
        const userId = req.params.id;

        const {
            name,
            description,
            condition,
            value,
            insuranceValue,
            installmentsNumber,
            installmentsValue
        } = req.body;
    
        if (!name || !description || !condition || !value || !insuranceValue || !installmentsNumber || !installmentsValue) {
            throw new BadRequestError('Todos os campos são obrigatórios');
        }

        if (isNaN(Number(value))) {
            throw new BadRequestError('O valor do imóvel deve ser um número');
        }

        if (isNaN(Number(insuranceValue))) {
            throw new BadRequestError('O valor do seguro deve ser um número');
        }

        if (isNaN(Number(installmentsNumber))) {
            throw new BadRequestError('A quantidade de parcelas deve ser um número');
        }

        if (isNaN(Number(installmentsValue))) {
            throw new BadRequestError('O valor das parcelas deve ser um número');
        }
        
        const validConditions = ["Novo", "Reformado", "Antigo"]; 
        if (!validConditions.includes(condition)) {
            throw new BadRequestError('Condição do imóvel inválida');
        }

        const user = await userRepository.findOneBy({ id: Number(userId) });
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        
        const quote = quoteRepository.create({
            name,
            description,
            condition,
            value,
            insuranceValue,
            installmentsNumber,
            installmentsValue,
            user: user
        });

        await quoteRepository.save(quote);

        const { user: _, ...quoteWithoutUser } = quote;

        return res.status(201).json(quoteWithoutUser);

    }

    async getQuotes(req: Request, res: Response) {
        const userId = req.params.id;
    
        const user = await userRepository.findOneBy({ id: Number(userId) });
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const quotes = await quoteRepository.find({ where: { user } });
    
        if (!quotes || quotes.length === 0) {
            throw new NotFoundError('Cotações não encontradas para o usuário');
        }
    
        return res.status(200).json(quotes);
    }

}