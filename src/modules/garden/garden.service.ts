import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models';
import { Garden } from "src/models/garden.entity";
import { BaseCRUD } from 'src/modules/shared/base/crud.database';
import { GardenType, GardenUpdate } from "src/types/garden";
import { Repository } from 'typeorm';

@Injectable()
export class GardenService extends BaseCRUD {
  constructor(
    @InjectRepository(Garden)
    private gardenRepository: Repository<Garden>
  ) {
    super(gardenRepository);
  }

  getRepository() {
    return this.gardenRepository;
  }

  async createGarden(data: GardenType, user: User) {
    try {

      return await this.create({ ...data, owner: user }, user);
    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }
  }

  async updateGarden(id: number, data: GardenUpdate, user: User) {
    try {
      const result = await this.updateById(id, { ...data, owner: user }, user);
      return result;
    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException(error, 500);
    }
  }
}
