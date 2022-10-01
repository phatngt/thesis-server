import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class GardenDTO {
  @ApiProperty({
    description: 'Name of the garden',
    default: 'Abc',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @ApiProperty({
    description: 'Quatity of the garden',
    type: Number,
  })
  @IsOptional()
  size: number;

  @ApiProperty({
    description: 'Location of the garden',
    default: 'East',
  })
  @IsOptional()
  @MaxLength(100)
  location: string;
}

export class GardenUpdateDTO {
  @ApiProperty({
    description: 'Name of the garden',
    default: 'Abc',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsOptional()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @ApiPropertyOptional()
  image: string;

  @ApiProperty({
    description: 'Quatity of the garden',
    default: 5,
  })
  @IsOptional()
  size: number;

  @ApiProperty({
    description: 'Location of the garden',
    default: 'East',
  })
  @IsOptional()
  @MaxLength(100)
  location: string;
}
