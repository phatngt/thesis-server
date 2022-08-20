import { Body, Controller, Get, HttpException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/client-roles.decorator';
import { RolesGuard } from 'src/auth/client-roles.guard';
import { Roles } from 'src/constants/decorator';
import { GardenRoomDTO, GardenRoomUpdateDTO } from 'src/dto/garden-room';
import { AppRequest } from 'src/types';
import { GardenRoomService } from './garden-room.service';

@ApiTags("Garden room")
@Controller('garden-room')
export class GardenRoomController {
  constructor(
    private gardenRoomService: GardenRoomService
  ) { }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get()
  async getRoomsByUser(@Request() req: AppRequest) {
    try {
      const raw = await this.gardenRoomService.getAll({}, { pairWithId: { owner: { id: req.user.id } }, relations: ["owner"] });
      const result = raw.map((r) => { const { owner, ...re } = r; return re });
      return result
    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException("Data is having a problem", 500);
    }

  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get('/:id')
  async getRoom(@Param('id') id: string, @Request() req: AppRequest) {
    const { owner, ...result } = await this.gardenRoomService.getById(Number(id), { pairWithId: { owner: { id: req.user.id } }, relations: ['owner'] });
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Post('/create')
  async createRoom(@Request() req: AppRequest, @Body() data: GardenRoomDTO) {
    return this.gardenRoomService.createRoom(data, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Patch('/update/:id')
  async updateRoom(@Param('id') id: string, @Request() req: AppRequest, @Body() data: GardenRoomUpdateDTO) {
    return this.gardenRoomService.updateRoom(Number(id), data, req.user)
  }
}
