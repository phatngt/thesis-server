import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { DataSource } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './client-jwt.strategy';
import { LocalStrategy } from './client-local.strategy';
import { RolesGuard } from './client-roles.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let dataSource: DataSource;
  beforeEach(async () => {
    dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgresql",
      password: "postgresql",
      database: "garden",
    })
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: `${configService.get<string>('JWT_EXPIRATION_TIME')}s` },
          })
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtStrategy, LocalStrategy, RolesGuard, { provide: DataSource, useValue: dataSource }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
