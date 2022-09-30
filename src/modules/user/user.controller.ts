import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/modules/auth/client-roles.decorator';
import { RolesGuard } from 'src/modules/auth/client-roles.guard';
import { Roles } from 'src/constants/decorator';
import { UserUpdateDTO } from 'src/dto/user';
import { UserService } from './user.service';
import { AppRequest } from 'src/types';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Get('/:id')
  async profile(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.USER)
  @Patch('update/:id')
  async update(
    @Request() req: AppRequest,
    @Param('id') id: string,
    @Body() data: UserUpdateDTO,
  ) {
    return this.userService.update(Number(id), data, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Role(Roles.ADMIN)
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    console.log('here');
  }
}
