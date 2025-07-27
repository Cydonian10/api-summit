import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GradoService } from '../services/grado.service';
import {
  CreateGradoDto,
  InsertCursosGradoDto,
  InsertSeccionesGradoDto,
  UpdateGradoDto,
} from '../dtos/grado.dto';

@Controller('grados')
export class GradoController {
  constructor(private gradoSrv: GradoService) {}

  @Get()
  getMany() {
    return this.gradoSrv.getMany();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.gradoSrv.getOne(id);
  }

  @Get(':id/secciones')
  getGradoSeccioens(@Param('id', ParseIntPipe) id: number) {
    return this.gradoSrv.getSecciones(id);
  }

  @Get(':id/cursos')
  getGradoCursos(@Param('id', ParseIntPipe) id: number) {
    return this.gradoSrv.getGradoCursos(id);
  }

  @Post()
  create(@Body() createDto: CreateGradoDto) {
    return this.gradoSrv.create(createDto);
  }

  @Put(':id')
  update(
    @Body() createDto: UpdateGradoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.gradoSrv.update(createDto, id);
  }

  @Put(':id/insert-secciones')
  insertSeccionesToGrado(
    @Body() createDto: InsertSeccionesGradoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.gradoSrv.insertSeccionesToGrado(id, createDto.seccionesIds);
  }

  @Put(':id/insert-cursos')
  insertCursosToGrado(
    @Body() createDto: InsertCursosGradoDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.gradoSrv.insertCursosToGrado(id, createDto.cursosIds);
  }
}
