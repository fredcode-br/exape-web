import { AppDataSource } from "../data-source";
import { Quote } from "../entities/Quote";

export const quoteRepository = AppDataSource.getRepository(Quote);