import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/guards/google-auth/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

import { ApiTags, ApiConsumes, ApiBody, ApiSecurity } from '@nestjs/swagger';
import cloudinary from 'src/config/cloudinary.config';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${uuid()}${path.extname(file.originalname)}`;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        profileImage: { type: 'string', format: 'binary' },
      },
    },
  })
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl: string | null = null;

    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: 'users',
      });
      imageUrl = uploadResult.secure_url;
      fs.unlinkSync(file.path);
    }

    return this.userService.create(createUserDto, imageUrl as string);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiSecurity('JWT-auth')
  @Get()
  @UseGuards(new RoleGuard('admin'))
  findAll() {
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
