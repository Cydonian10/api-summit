import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CronogramaService } from '../services/cronograma.service';
import { CreateCronogramaDto } from '../dtos/cronograma/cronograma.dto';
import { FiltroCronogramaDto } from '../dtos/cronograma/filtro.dto';
import { UpdateCronogramaDto } from '../dtos/cronograma/cronograma-update.dto';

@Controller('cronogramas')
export class CronogramaController {
  constructor(private cronogramaSrv: CronogramaService) {}

  @Post()
  create(@Body() dto: CreateCronogramaDto) {
    return this.cronogramaSrv.create(dto);
  }

  @Put(':id')
  update(
    @Body() dto: UpdateCronogramaDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cronogramaSrv.update(id, dto);
  }

  @Get()
  getAll(@Query() dto: FiltroCronogramaDto) {
    return this.cronogramaSrv.getAll(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cronogramaSrv.delete(id);
  }
}
