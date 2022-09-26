import { Body, Controller, Injectable, Post, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/constants/decorator';
import { PlantDTO, PlantTypeDTO } from 'src/dto/plant';
import { FileExtenderInterceptor } from 'src/interceptors/file-extender.interceptor';
import { TransformPlantDtoPipe } from 'src/pipes/transform-plant-dto.pipe';
import { AppRequest } from 'src/types';
import { Role } from '../auth/client-roles.decorator';
import { RolesGuard } from '../auth/client-roles.guard';
import { PlantService } from './plant.service';

@ApiTags("PLANTS")
@Controller('plant')
export class PlantController {
  constructor(
    private plantService: PlantService
  ) { }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.ADMIN)
  @Post('/add-plant-type')
  async createPlantType(@Request() req: AppRequest, @Body() data: PlantTypeDTO) {
    try {
      const result = await this.plantService.createPlantType(data, req.user);
      return result;
    } catch (error) {
      return error.message;
    }
  }

  // @ApiBearerAuth()
  // @UseGuards(RolesGuard)
  // @Role(Roles.USER)
  @Post('/add-plant')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PlantDTO })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'files', maxCount: 6 },
  ]))
  async createPlant(@Request() req: AppRequest, @Body() data: PlantDTO, @UploadedFiles() files: Express.Multer.File[]) {
    try {
      const updateData = { ...data, files: files };
      const result = await this.plantService.createPlant(updateData, req.user)
      return result;
    } catch (error) {
      console.log("ERROR: ", error);
      return error.message;
    }
  }
}
