import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './client-local.strategy';
import { JwtStrategy } from './client-jwt.strategy';
import { RolesGuard } from './client-roles.guard';


@Module({
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
  providers: [AuthService, UserService, JwtStrategy, LocalStrategy, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule { }
