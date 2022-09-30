import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthEndPoints, ModuleEndPoints } from 'src/constants/slug';
import { LoginDTO, RegisterDTO } from 'src/dto/auth';
import { AppRequest } from 'src/types';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './client-local-auth.guard';

@ApiTags('Login')
@Controller(ModuleEndPoints.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(AuthEndPoints.LOGIN)
  async login(@Request() req: AppRequest, @Body() _: LoginDTO) {
    return this.authService.login(req.user);
  }

  @Post(AuthEndPoints.REGISTRATION)
  async registration(@Body() data: RegisterDTO) {
    return this.authService.register(data);
  }
}
