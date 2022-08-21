import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO, UserUpdateDTO } from 'src/dto/user';
import { Roles, User, UserType } from 'src/models/index';
import { Repository } from 'typeorm';
import { auditAdd } from "src/helpers/index";
import { UserPermision, UserTypes } from 'src/constants/user';
import { BaseCRUD } from 'src/shared/base/crud.database';
@Injectable()
export class UserService extends BaseCRUD {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Roles)
    private roleUserRepository: Repository<Roles>,
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>
  ) {
    super(userRepository);
  }

  async findByEmail(email: string) {
    try {
      const user = await this.getOne({ email: email }, { relations: ['role', 'user_type'] });
      if (!user) {
        return null;
      }
      return user;

    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }

  }
  // TODO: Update DTO -> TYPE
  async createUser(data: UserCreateDTO) {
    const dataWithAudit = { ...data, ...auditAdd() }
    try {
      const role = await this.getOne({ name: UserPermision.USER });
      if (!role) throw new HttpException("Role user not existed", 500);

      const type = await this.getOne({ name: UserTypes.CLIENT });
      if (!type) throw new HttpException("Type user not existed", 500);

      const { password, ...user } = await this.create({ ...dataWithAudit, role: role, user_type: type });
      return user;

    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }
  }

  // TODO: Update DTO -> TYPE
  async update(id: number, data: UserUpdateDTO) {
    try {
      const user = await this.getOne({ where: { id } });
      if (!user) throw new HttpException("User not existed", 409);
      const { password, ...result } = await this.updateById(id, data, user);
      return result;
    } catch (error) {

    }

  }
}
