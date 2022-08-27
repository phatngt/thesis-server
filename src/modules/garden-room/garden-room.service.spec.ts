import { Test, TestingModule } from '@nestjs/testing';
import { GardenRoomService } from './garden-room.service';

describe('GardenRoomService', () => {
  let service: GardenRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GardenRoomService],
    }).compile();

    service = module.get<GardenRoomService>(GardenRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
