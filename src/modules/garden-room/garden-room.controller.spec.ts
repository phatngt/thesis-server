import { Test, TestingModule } from '@nestjs/testing';
import { GardenRoomController } from './garden-room.controller';

describe('GardenRoomController', () => {
  let controller: GardenRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GardenRoomController],
    }).compile();

    controller = module.get<GardenRoomController>(GardenRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
