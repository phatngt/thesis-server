import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO, UserUpdateDTO } from 'src/dto/user';
import { Roles, User, UserType } from 'src/models/index';
import { Repository } from 'typeorm';
import { auditAdd, auditUpdate } from "src/helpers/index";
import { UserPermision, UserTypes } from 'src/constants/user';
import { BaseCRUD } from 'src/modules/shared/base/crud.database';
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

  async getUserById(id: number) {
    try {
      if (!id) throw new HttpException("Bad request", 400);
      const user = await this.getById(id, { relations: ["role", "user_type"] });
      if (!user) {
        throw new HttpException("User not existed", 409)
      }
      return user;
    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.getOne({ email: email }, { relations: ['role', 'user_type'] });
      if (!user) {
        return null;
      }
      return user;

    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }

  }
  // TODO: Update DTO -> TYPE
  async createUser(data: UserCreateDTO) {
    const dataWithAudit = { ...data, ...auditAdd() }
    try {
      const role = await this.roleUserRepository.findOneBy({ name: UserPermision.USER });

      if (!role) throw new HttpException("Role user not existed", 500);

      const type = await this.userTypeRepository.findOneBy({ name: UserTypes.CLIENT });
      if (!type) throw new HttpException("Type user not existed", 500);

      const { password, ...user } = await this.create({ ...dataWithAudit, role: role, user_type: type });
      return user;

    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }
  }

  // TODO: Update DTO -> TYPE
  async update(id: number, data: UserUpdateDTO, user: User) {
    try {
      const user = await this.getOne({ where: { id } });
      if (!user) throw new HttpException("User not existed", 409);

      const auditData = { ...data, ...auditUpdate(user) }
      const { password, ...result } = await this.updateById(id, auditData, user);

      return result;
    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }

  }
}
