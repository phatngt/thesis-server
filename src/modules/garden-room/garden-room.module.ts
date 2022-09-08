import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GardenRoom } from 'src/models/garden-room.entity';
import { FileModule } from '../file/file.module';
import { GardenRoomController } from './garden-room.controller';
import { GardenRoomService } from './garden-room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GardenRoom]),
    FileModule
  ],
  controllers: [GardenRoomController],
  providers: [GardenRoomService]
})
export class GardenRoomModule { }
