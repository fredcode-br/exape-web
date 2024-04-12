import { Router } from "express";
import { QuoteController } from "../controllers/QuoteController";
const quoteRoutes = Router();

quoteRoutes
    .post('/cotacao/processamento', new QuoteController().process)
    .post('/cotacao/:id', new QuoteController().save)
    .get('/cotacao/:id', new QuoteController().getQuotes);

export default quoteRoutes;
