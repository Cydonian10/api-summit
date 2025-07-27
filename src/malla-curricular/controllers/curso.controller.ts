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
import { UpdateCursoDto } from '../dtos/curso.dto';
import { CursoService } from '../services/curso.service';

@Controller('cursos')
export class CursoController {
  constructor(private cursoSrv: CursoService) {}

  @Get()
  getMany() {
    return this.cursoSrv.getMany();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.cursoSrv.getOne(id);
  }

  @Post()
  create(@Body() createDto: CreateCursoDto) {
    return this.cursoSrv.create(createDto);
  }

  @Put(':id')
  update(@Body() updateDto: UpdateCursoDto, @Param('id') id: number) {
    return this.cursoSrv.update(updateDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.cursoSrv.delete(id);
  }
}
