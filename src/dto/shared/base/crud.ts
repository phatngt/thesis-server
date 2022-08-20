import { ApiPropertyOptional } from '@nestjs/swagger';

export class PagingDto {
  @ApiPropertyOptional({ default: 0 }) offset: any;
  @ApiPropertyOptional({ default: 0 }) limit: any;
  @ApiPropertyOptional({ example: 'order' }) order: any;
  @ApiPropertyOptional() filter: any;
}
