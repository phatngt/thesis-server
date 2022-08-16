import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from 'src/dto/user';
import { Roles, User, UserType } from 'src/models';
import { Repository } from 'typeorm';
import { auditAdd } from "src/helpers/index";
import { UserPermision, UserTypes } from 'src/constants/user';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Roles)
    private roleUserRepository: Repository<Roles>,
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>
  ) { }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email: email });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.log("error: ", error);
      throw new HttpException(error, 500);
    }

  }

  async create(data: UserCreateDTO) {
    const dataWithAudit = { ...data, ...auditAdd() }
    try {
      const role = await this.roleUserRepository.findOneBy({ name: UserPermision.USER });
      if (!role) throw new HttpException("Role user not existed", 500);

      const type = await this.userTypeRepository.findOneBy({ name: UserTypes.CLIENT })
      if (!type) throw new HttpException("Type user not existed", 500);
      const user = await this.userRepository.save({ ...dataWithAudit, role: role, user_type: type });
      return user;
    } catch (error) {
      throw new HttpException(error, 500);
    }

  }
}
