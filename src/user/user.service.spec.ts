import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Roles, User, UserType } from 'src/models';
import { UserSubcriber } from 'src/subcribers/user.subcriber';
import { DataSource, InsertEvent, UpdateEvent } from 'typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let dataSource: DataSource;
  beforeEach(async () => {
    dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgresql",
      password: "postgresql",
      database: "garden",
    })
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User, Roles, UserType], dataSource)],
      providers: [UserService, UserSubcriber, DataSource, { provide: UserService, useValue: dataSource }]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
