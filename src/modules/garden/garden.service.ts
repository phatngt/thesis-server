import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models';
import { Garden } from 'src/models/garden.entity';
import { BaseCRUD } from 'src/modules/shared/base/crud.database';
import { GardenType, GardenUpdate } from 'src/types/garden';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';

@Injectable()
export class GardenService extends BaseCRUD {
  constructor(
    @InjectRepository(Garden)
    private gardenRepository: Repository<Garden>,
    private fileService: FileService,
  ) {
    super(gardenRepository);
  }

  getRepository() {
    return this.gardenRepository;
  }

  async createGarden(data: GardenType, user: User) {
    try {
      //Upload image to S3
      const imageUrl = await this.fileService.uploadImage(
        data.image.data,
        data.image.name,
      );
      return await this.create({ ...data, image: imageUrl, owner: user }, user);
    } catch (error) {
      console.log('ERROR: ', error);
      return new HttpException(error, 500);
    }
  }

  async updateGarden(id: number, data: GardenUpdate, user: User) {
    try {
      const result = await this.updateById(id, { ...data, owner: user }, user);
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return new HttpException(error, 500);
    }
  }
}
