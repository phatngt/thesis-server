import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [ConfigModule],
  exports: [FileService],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule { }
