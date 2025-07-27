import { CreateCursoDto } from './../dtos/curso.dto';
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

import { CreateSeccionDto, UpdateSeccionDto } from '../dtos/seccion.dto';
import { SeccionService } from '../services/seccion.service';

@Controller('secciones')
export class SeccionController {
  constructor(private seccionSrv: SeccionService) {}

  @Get()
  getMany() {
    return this.seccionSrv.getMany();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.seccionSrv.getOne(id);
  }

  @Post()
  create(@Body() createDto: CreateSeccionDto) {
    return this.seccionSrv.create(createDto);
  }

  @Put(':id')
  update(@Body() updateDto: UpdateSeccionDto, @Param('id') id: number) {
    return this.seccionSrv.update(updateDto, id);
  }

  @Delete(':ids')
  delete(@Param('ids') ids: string) {
    const idArray = ids.split(',').map((id) => parseInt(id, 10));
    return this.seccionSrv.delete(idArray);
  }
}
