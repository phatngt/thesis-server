import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garden } from "src/models/garden.entity";
import { FileModule } from '../file/file.module';
import { GardenController } from "./garden.controller";
import { GardenService } from "./garden.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Garden]),
    FileModule
  ],
  controllers: [GardenController],
  providers: [GardenService]
})
export class GardenModule { }
