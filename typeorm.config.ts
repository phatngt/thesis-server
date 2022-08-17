import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('HOST'),
  port: 5432,
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: [
    "dist/migrations/*{.ts,.js}",
    "dist/seeds/*{.ts,.js}",
  ],
});
