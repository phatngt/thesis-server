import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles, User, UserType } from 'src/models';
import { UserSubcriber } from 'src/subcribers/user.subcriber';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles, UserType]),
  ],
  exports: [TypeOrmModule.forFeature([User, Roles])],
  providers: [UserService, UserSubcriber]
})
export class UserModule { }
