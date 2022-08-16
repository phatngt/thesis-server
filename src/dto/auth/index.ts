import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import { UserCreateDTO } from "src/dto/user";

export class LoginDTO {
  @ApiProperty({
    description: "Email user",
    default: 'abc@gmail.com'
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description: "Password user",
    default: '12345678'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string
}

export class RegisterDTO extends UserCreateDTO {
}
