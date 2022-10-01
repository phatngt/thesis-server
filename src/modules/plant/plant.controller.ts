import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/constants/decorator';
import { PlantCreateDTO, PlantTypeDTO, PlantUpdateDTO } from 'src/dto/plant';
import { AppRequest } from 'src/types';
import { Role } from '../auth/client-roles.decorator';
import { RolesGuard } from '../auth/client-roles.guard';
import { PlantService } from './plant.service';

@ApiTags('PLANTS')
@Controller('plant')
export class PlantController {
  constructor(private plantService: PlantService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get()
  async getAllPlant(@Request() req: AppRequest) {
    try {
      const result = await this.plantService.getAll({ owner: req.user });
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return error.message;
    }
  }

  @ApiBearerAuth()
  @Post('/create-type')
  async createPlantType(
    @Request() req: AppRequest,
    @Body() data: PlantTypeDTO,
  ) {
    console.log('data: ', data);
    try {
      const result = await this.plantService.createPlantType(data, req.user);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PlantCreateDTO })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 6 }]))
  async createPlant(
    @Request() req: AppRequest,
    @Body() data: PlantCreateDTO,
    @UploadedFiles() files: { images: Express.Multer.File[] },
  ) {
    try {
      const updateData = { ...data, files: files.images };
      const result = await this.plantService.createPlant(updateData, req.user);
      console.log('result: ', result);
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return error.message;
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Patch('/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PlantUpdateDTO })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 6 }]))
  async updatePlant(
    @Param('id') id: string,
    @Request() req: AppRequest,
    @Body() data: PlantUpdateDTO,
    @UploadedFiles() files: { images: Express.Multer.File[] },
  ) {
    try {
      const updateData = { ...data, files: files.images };
      const result = await this.plantService.updatePlant(
        parseInt(id),
        updateData,
        req.user,
      );
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return error.message;
    }
  }

  @ApiBearerAuth()
  @Delete('/:id')
  async deletePlant(@Param('id') id: string, @Request() req: AppRequest) {
    try {
      if (!id) throw new HttpException('Bad request', 400);
      return await this.plantService.deletePlant(Number(id), req.user);
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    }
  }
}
