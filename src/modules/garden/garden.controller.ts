import { Body, Controller, Get, HttpException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/modules/auth/client-roles.decorator';
import { RolesGuard } from 'src/modules/auth/client-roles.guard';
import { Roles } from 'src/constants/decorator';
import { AppRequest } from 'src/types';
import { GardenService } from "./garden.service";
import { GardenDTO, GardenUpdateDTO } from "src/dto/garden";

@ApiTags("Garden ")
@Controller('garden')
export class GardenController {
  constructor(
    private gardenService: GardenService
  ) { }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get()
  async getsByUser(@Request() req: AppRequest) {
    try {
      const raw = await this.gardenService.getAll({}, { pairWithId: { owner: { id: req.user.id } }, relations: ["owner"] });
      const result = raw.map((r) => { const { owner, ...re } = r; return re; });
      return result;
    } catch (error) {
      console.log("ERROR: ", error);
      return new HttpException("Data is having a problem", 500);
    }

  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get('/:id')
  async get(@Param('id') id: string, @Request() req: AppRequest) {
    const { owner, ...result } = await this.gardenService.getById(Number(id), { pairWithId: { owner: { id: req.user.id } }, relations: ['owner'] });
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Post('/create')
  async create(@Request() req: AppRequest, @Body() data: GardenDTO) {
    return this.gardenService.createGarden(data, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Patch('/update/:id')
  async update(@Param('id') id: string, @Request() req: AppRequest, @Body() data: GardenUpdateDTO) {
    return this.gardenService.updateGarden(Number(id), data, req.user);
  }
}
