import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from 'src/dto/auth';
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
    if (user && user.password == pwd) {
      const { password, ...result } = user;
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

  async register(data: RegisterDTO) {
    const userEmail = await this.userService.findByEmail(data.email);
    if (userEmail) throw new HttpException("User has existed", 409)

    try {
      const user = this.userService.create(data);
      return user;
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}
