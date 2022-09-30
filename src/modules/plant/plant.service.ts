import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { auditAdd } from 'src/helpers';
import { User } from 'src/models';
import { PlantTypes } from 'src/models/plant-type.entity';
import { Plants } from 'src/models/plants.entity';
import { CreatePlantType, PlantType, UpdatePlantType } from 'src/types/plant';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { BaseCRUD } from '../shared/base/crud.database';

@Injectable()
export class PlantService extends BaseCRUD {
  constructor(
    @InjectRepository(Plants)
    private plantRepository: Repository<Plants>,
    @InjectRepository(PlantTypes)
    private plantTypeRepository: Repository<PlantTypes>,
    private fileService: FileService,
  ) {
    super(plantRepository);
  }

  async createPlantType(
    plantType: PlantType,
    admin: User,
  ): Promise<PlantTypes> {
    try {
      const pType = await this.plantTypeRepository.findOneBy({
        name: plantType.name,
      });
      if (pType) throw new HttpException('Plant type has existed', 409);

      const newPType = await this.plantTypeRepository.save({
        name: plantType.name,
        description: plantType.description ?? '',
        family: plantType.family ?? '',
        genus: plantType.genus ?? '',
        species: plantType.species,
        light: plantType.light ?? 'MEDIUM',
        ...auditAdd(admin),
      });
      return newPType;
    } catch (error) {
      console.log('ERROR: ', error);
      throw error;
    }
  }

  async createPlant(plantData: CreatePlantType, user: User) {
    try {
      // Get plant type
      const pType = await this.plantTypeRepository.findOneBy({
        id: plantData.plantTypeId,
      });
      if (!pType) throw new HttpException("Plant type don't existed", 500);
      // Upload image
      const linkImages: string[] = [];
      const listImages = plantData.files;
      for (let i = 0; i < listImages.length; ++i) {
        const imageLink = await this.fileService.uploadImage(
          listImages[i].buffer,
          plantData.name,
        );
        linkImages.push(imageLink);
      }

      delete plantData['files'];
      const updateData = { ...plantData, image: linkImages, owner: user };
      console.log('data: ', updateData);
      const result = this.create(updateData, user);
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    }
  }

  async updatePlant(id: number, plantData: UpdatePlantType, user: User) {
    try {
      const linkImages: string[] = [];
      const listImages = plantData.files;
      for (let i = 0; i < listImages.length; ++i) {
        const imageLink = await this.fileService.uploadImage(
          listImages[i].buffer,
          plantData.name,
        );
        linkImages.push(imageLink);
      }

      delete plantData['images'];
      const updateData = { ...plantData, image: linkImages };
      const result = this.updateById(id, updateData, user);
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    }
  }

  async deletePlant(id: number, user: User) {
    try {
      const plant = this.getOne({ id: id, owner: user });
      console.log('plant: ', plant);
    } catch (error) {}
  }
}
