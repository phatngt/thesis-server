import { Controller, Post, UploadedFiles, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/constants/decorator';
import { Role } from '../auth/client-roles.decorator';
import { RolesGuard } from '../auth/client-roles.guard';
import { FileService } from './file.service';

@ApiTags("FILE")
@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService
  ) { }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Post('/upload-image')
  uploadImage(@UploadedFiles() file: Express.Multer.File) {
    console.log("file: ", file)
  }
}
