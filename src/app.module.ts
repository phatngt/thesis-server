import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { GardenRoomModule } from './garden-room/garden-room.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env', '.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: ["dist/**/*.entity{.ts,.js}"],
        extra: configService.get<string>('NODE_ENV') == "production" ? {
          "ssl": {
            "rejectUnauthorized": false
          }
        } : {}
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NODE_ENV') == "production" ?
          `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_NAME || 'admin'}?retryWrites=true&w=majority` :
          `mongodb://${configService.get<string>('MONGO_USER')}:${configService.get<string>('MONGO_PASSWORD')}@${configService.get<string>('MONGO_HOST')}:27017/${configService.get<string>('MONGO_NAME') || 'admin'}?authSource=${configService.get<string>('MONGO_AUTHDB') || 'admin'}`
      })
    }),
    SharedModule,
    UserModule,
    GardenRoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
