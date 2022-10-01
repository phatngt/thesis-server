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

  async updateGarden(
    id: number,
    data: GardenUpdate,
    user: User,
    file?: Express.Multer.File,
  ) {
    try {
      const garden = await this.getById(id, {
        pairWithId: { owner: { id: user.id } },
        relations: ['owner'],
      });
      if (!garden) throw new HttpException('Forbidden', 403);
      if (file) {
        const url = await this.fileService.uploadImage(
          file.buffer,
          file.originalname,
        );
        data = { ...data, image: url };
      }
      const result = await this.updateById(id, { ...data }, user);
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return new HttpException(error, 500);
    }
  }

  async deleteGarden(id: number, user?: User) {
    try {
      const garden = await this.getById(id, {
        pairWithId: { owner: { id: user.id } },
        relations: ['owner'],
      });
      if (!garden) throw new HttpException('Forbidden', 403);
      const success = this.softDeleteById(id, user);
      if (!success) throw new HttpException('Forbidden', 403);
      return true;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    }
  }
}
