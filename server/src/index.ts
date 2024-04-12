import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

AppDataSource.initialize().then(() => {
    const app = express();
    
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS 
      }));

    app.use(express.json());

    routes(app);

    app.use(errorMiddleware);

    return app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
})