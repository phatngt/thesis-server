import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantTypes } from 'src/models/plant-type.entity';
import { Plants } from 'src/models/plants.entity';
import { FileModule } from '../file/file.module';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plants, PlantTypes]),
    FileModule
  ],
  controllers: [PlantController],
  providers: [PlantService]
})
export class PlantModule { }
