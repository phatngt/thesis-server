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
      const parentId = data.parent_room_id ? await this.getById(data.parent_room_id) : null;
      const sufficientData = !parentId ? { ...data, parent_room_id: null, owner: user.id } : { ...data, parent_room_id: parentId, owner: user.id };

      return await this.create(sufficientData, user)
    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }
  }

  async updateRoom(id: number, data: GardenRoomUpdate, user: User) {
    try {
      const parentId = data.parent_room_id ? await this.getById(data.parent_room_id) : null;
      const sufficientData = !parentId ? { ...data, parent_room_id: null, owner: user.id } : { ...data, parent_room_id: parentId, owner: user.id };

      const result = await this.updateById(id, sufficientData, user);
      console.log("result: ", result);
      return result;
    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }
  }
}
