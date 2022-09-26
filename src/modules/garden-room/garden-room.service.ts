import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { auditAdd } from 'src/helpers';
import { User } from 'src/models';
import { GardenRoom } from 'src/models/garden-room.entity';
import { BaseCRUD } from 'src/modules/shared/base/crud.database';
import { GardenRoomType, GardenRoomUpdate } from 'src/types/garden-room';
import { Repository } from 'typeorm';

@Injectable()
export class GardenRoomService extends BaseCRUD {
  constructor(
    @InjectRepository(GardenRoom)
    private gardenRoomRepository: Repository<GardenRoom>
  ) {
    super(gardenRoomRepository);
  }

  getRepository() {
    return this.gardenRoomRepository;
  }

  async createRoom(data: GardenRoomType, user: User) {
    try {
      return await this.create({ ...data, owner: user.id, image: "" }, user);

    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }
  }

  async updateRoom(id: number, data: GardenRoomUpdate, user: User) {
    try {
      const result = await this.updateById(id, { ...data, owner: user.id }, user);
      return result;
    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }
  }
}
