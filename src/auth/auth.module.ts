import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    UserModule],
  providers: [AuthService, UserService, JwtService],
  controllers: [AuthController]
})
export class AuthModule { }
