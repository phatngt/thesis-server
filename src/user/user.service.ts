import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from 'src/dto/user';
import { User } from 'src/models';
import { Repository } from 'typeorm';
import { auditAdd } from "src/helpers/index";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userReposity: Repository<User>
  ) { }

  async findByEmail(email: string) {
    const user = await this.userReposity.findOneBy({ email: email });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: UserCreateDTO) {
    const dataWithAudit = { ...data, ...auditAdd() }
    const user = this.userReposity.save(data);
    if (!user) return null;
    return user;
  }
}
