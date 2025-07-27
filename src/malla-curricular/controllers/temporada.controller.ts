import { InjectRepository } from '@nestjs/typeorm';
import { TemporadaService } from '../services/temporada.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTemporadaDto, UpdateTemporadaDto } from '../dtos/temporada.dto';

@Controller('temporada')
export class TemporadaController {
  constructor(private temporadaSrv: TemporadaService) {}

  @Get()
  getMany() {
    return this.temporadaSrv.getMany();
  }

  @Post()
  create(@Body() createDto: CreateTemporadaDto) {
    return this.temporadaSrv.create(createDto);
  }

  @Put(':id')
  update(
    @Body() updateDto: UpdateTemporadaDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.temporadaSrv.update(updateDto, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.temporadaSrv.delete(id);
  }
}
