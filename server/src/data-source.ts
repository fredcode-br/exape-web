import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

const options: DataSourceOptions = {
	type: 'better-sqlite3',
	database: "./db.sqlite",
    synchronize: true,
    logging: true,
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
}

export const AppDataSource = new DataSource(options);