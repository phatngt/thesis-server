import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, UserService, JwtService]
})
export class AuthModule { }
