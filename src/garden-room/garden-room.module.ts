import { Module } from '@nestjs/common';
import { GardenRoomController } from './garden-room.controller';
import { GardenRoomService } from './garden-room.service';

@Module({
  controllers: [GardenRoomController],
  providers: [GardenRoomService]
})
export class GardenRoomModule {}
