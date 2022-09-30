import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles, User, UserType } from 'src/models';
import { UserSubcriber } from 'src/subcribers/user.subcriber';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Roles, UserType])],
  exports: [TypeOrmModule.forFeature([User, Roles])],
  providers: [UserService, UserSubcriber],
  controllers: [UserController],
})
export class UserModule {}
