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
import { Response } from 'express';

@Controller('okr')
export class OkrController {
  constructor(
    private okrService: OkrService,
    private userService: UserService,
  ) {}

  @Get()
  async index(@Res() res: Response) {
    try {
      let user = await this.userService.show(1);
      let data = await this.okrService.index(user);
      res.status(200).json({ data: data });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }

  @Post()
  async insert(@Body() dto: any, @Res() res: Response) {
    try {
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
      let data = await this.okrService.insert(newOkr); //级联增加
      res.status(200).json({ data: data });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }

  @Put('/:id')
  async update(@Param('id') id: any, @Body() body: any) {
    body.finished_time = Number(body.status) ? new Date() : null;
    let params = body as Partial<Okr>;
    return this.okrService.update(id, params);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.okrService.remove(+id);
  }

  @Post('/edit') //okr edit
  async edit(@Body() dto: any, @Res() res: Response) {
    try {
      let dropKrs = dto.dropKrs;
      await this.okrService.delete(dropKrs);
      let newOkr = dto.newOkr;
      let data = await this.okrService.edit(newOkr); //级联修改+级联增加
      res.status(200).json({ data: data });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }

  @Get('/:id') //okr detail
  async show(@Param('id') id: string, @Res() res: Response) {
    try {
      let data = await this.okrService.show(+id);
      res.status(200).json({ data: data });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }
}
