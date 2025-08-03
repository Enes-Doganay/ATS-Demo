import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'pb_demo',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    logging: true,
    synchronize: true,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});