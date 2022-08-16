import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty({
    description: 'User first name',
    default: 'John',
  })
  @IsString()
  @MaxLength(50)
  fname: string;

  @ApiProperty({
    description: 'User last name',
    default: 'Witch',
  })
  @IsString()
  @MaxLength(50)
  lname: string;

  @ApiProperty({
    description: 'User email',
    default: 'abc@gmail.com',
  })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description: 'User password',
    default: '12345678',
  })
  @MinLength(6)
  @MaxLength(60)
  password: string;

  @ApiProperty({
    description: 'User phone',
    default: '0333333333',
  })
  @MinLength(1)
  @MaxLength(20)
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'Birthday',
    default: '01/01/1001',
  })
  @MinLength(10)
  @IsOptional()
  birthday: string;

  @ApiProperty({
    description: 'Address',
    default: 'VietNam',
  })
  @MinLength(5)
  @MaxLength(50)
  @IsOptional()
  address: string;
}
