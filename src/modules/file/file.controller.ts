import { Controller, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/constants/decorator';
import { Role } from '../auth/client-roles.decorator';
import { RolesGuard } from '../auth/client-roles.guard';
import { FileService } from './file.service';
import { FileExtender } from './interceptors/file.interceptor';

@ApiTags("FILE")
@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService
  ) { }

  // @ApiBearerAuth()
  // @UseGuards(RolesGuard)
  // @Role(Roles.USER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @Post('/upload-images')
  @UseInterceptors(FileExtender)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 6 },
  ]))
  async uploadImages(@UploadedFiles() files: { images?: Express.Multer.File[] }) {
    const data = files.images.map(e => ({ "name": e.originalname, "data": e.buffer }));
    return await this.fileService.uploadMultiImage(data);
  }
}
