import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { OkrService } from './okr.service';
import { UserService } from 'src/user/user.service';
import { Okr } from './okr.entity';
import { Keyresult } from 'src/keyresult/keyresult.entity';

@Controller('okr')
export class OkrController {
  constructor(
    private okrService: OkrService,
    private userService: UserService,
  ) {}

  @Get()
  async index() {
    let user = await this.userService.show(1);
    return this.okrService.index(user);
  }

  @Post()
  async insert(@Body() dto: any) {
    let user = await this.userService.show(1);
    let keyresult = dto.keyresult;
    let krs = keyresult.map((data) => {
      const kr = new Keyresult();
      kr.title = data.title;
      return kr;
    }) as Keyresult[];
    const newOkr = {
      user,
      title: dto.title,
      status: 0,
      keyresult: krs,
    };
    return this.okrService.insert(newOkr);
  }
}
