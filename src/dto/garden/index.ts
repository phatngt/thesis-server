import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class GardenDTO {
  @ApiProperty({
    description: "Name of the garden",
    default: "Abc"
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: " Image of the garden",
    default: ""
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  image: string;

  @ApiProperty({
    description: "Quatity of the garden",
    default: 0
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  size: number;

  @ApiProperty({
    description: "Location of the garden",
    default: "East"
  })
  @IsOptional()
  @MaxLength(100)
  location: string;
  @ApiProperty({
    description: "Belong to another garden",
    default: 0
  })
  @IsOptional()
  parent_id: number;
}

export class GardenUpdateDTO {
  @ApiProperty({
    description: "Name of the garden",
    default: "Abc"
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsOptional()
  name: string;

  @ApiProperty({
    description: " Image of the garden",
    default: ""
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  image: string;

  @ApiProperty({
    description: "Quatity of the garden",
    default: 0
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  size: number;

  @ApiProperty({
    description: "Location of the garden",
    default: "East"
  })
  @IsOptional()
  @MaxLength(100)
  location: string;
  @ApiProperty({
    description: "Belong to another garden",
    default: 0
  })
  @IsOptional()
  parent__id: number;
}
