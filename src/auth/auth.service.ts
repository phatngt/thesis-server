import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {

  }

  async validateUser(email: string, pwd: string): Promise<any> {
    const user = await this.userService.findByEmail(email); //need to index emai;
    if (user && user.pwd == pwd) {
      const { pwd, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role.name };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
