import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class PlantDTO {
  @ApiProperty({
    description: 'Plant name',
    default: 'Rose',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Plant career guide',
    default: 'Water on morning ...',
  })
  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  @IsOptional()
  careerGuide: string;

  @ApiProperty({
    description: 'Plant species',
    default: 'Abc',
  })
  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  color: string;

  @ApiProperty({
    description: 'Plant age',
    default: 1,
    type: 'int',
  })
  @ApiPropertyOptional()
  age: number;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @ApiPropertyOptional()
  images: any;

  @ApiProperty({
    description: 'Plant type id',
    default: 1,
    type: 'int',
  })
  plantTypeId: number;
}

export class PlantTypeDTO {
  @ApiProperty({
    description: 'Plant type',
    default: 'Rose',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Plant type description',
    default: 'Abc',
  })
  // @IsString()
  // @MinLength(1)
  // @MaxLength(1000)
  // @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Plant family',
    default: 'Abc',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  family: string;

  @ApiProperty({
    description: 'Plant genus',
    default: 'Abc',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  genus: string;

  @ApiProperty({
    description: 'Plant species',
    default: 'Abc',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  species: string;

  @ApiProperty({
    description: 'Plant species',
    default: 'Abc',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  light: string;
}

export class UpdatePlantDTO {
  @ApiProperty({
    description: 'Plant name',
    default: 'Rose',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Plant career guide',
    default: 'Water on morning ...',
  })
  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  @IsOptional()
  career_guide: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @ApiPropertyOptional()
  @IsOptional()
  images: any;
}
