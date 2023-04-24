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
import { KeyresultService } from './keyresult.service';
import { Response } from 'express';
import { Keyresult } from './keyresult.entity';

@Controller('keyresult')
export class KeyresultController {
  constructor(private keyresultService: KeyresultService) {}

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.keyresultService.delete(+id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    let params = body as Partial<Keyresult>;
    return this.keyresultService.update(id, params);
  }

  @Post()
  async addTodo(@Body() dto: any, @Res() res: Response) {
    try {
      let data = await this.keyresultService.addTodo(dto);
      res.status(200).json({ data: data });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }

  @Delete()
  async deleteTodo(@Body() dto: any, @Res() res: Response) {
    try {
      let data = await this.keyresultService.deleteTodo(dto);
      res.status(200).json({ data: data });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }
}
