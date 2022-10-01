import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/modules/auth/client-roles.decorator';
import { RolesGuard } from 'src/modules/auth/client-roles.guard';
import { Roles } from 'src/constants/decorator';
import { AppRequest } from 'src/types';
import { GardenService } from './garden.service';
import { GardenDTO, GardenUpdateDTO } from 'src/dto/garden';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Garden ')
@Controller('garden')
export class GardenController {
  constructor(private gardenService: GardenService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get()
  async getsByUser(@Request() req: AppRequest) {
    try {
      const raw = await this.gardenService.getAll(
        {},
        { pairWithId: { owner: { id: req.user.id } }, relations: ['owner'] },
      );
      const result = raw.map((r) => {
        const { owner, ...result } = r;
        return result;
      });
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return new HttpException('Data is having a problem', 500);
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get('/:id')
  async get(@Param('id') id: string, @Request() req: AppRequest) {
    const { owner, ...result } = await this.gardenService.getById(Number(id), {
      pairWithId: { owner: { id: req.user.id } },
      relations: ['owner'],
    });
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Request() req: AppRequest,
    @Body() data: GardenDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!data || !image) return new HttpException('Bad request', 40);
    const formatData = {
      ...data,
      size: Number(data.size),
      image: { data: image.buffer, name: image.originalname },
    };
    return this.gardenService.createGarden(formatData, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Request() req: AppRequest,
    @Body() data: GardenUpdateDTO,
    @UploadedFile('file') file?: Express.Multer.File,
  ) {
    try {
      if (!id) return new HttpException('Bad request', 400);
      return this.gardenService.updateGarden(Number(id), data, req.user, file);
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Request() req: AppRequest) {
    if (!id) return new HttpException('Bad request', 400);
    const result = await this.gardenService.deleteGarden(Number(id), req.user);
    return result;
  }
}
