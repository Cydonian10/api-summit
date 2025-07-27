import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlumnoSeccionService } from '../services/alumno-seccion.service';
import {
  CreateAlumnoMatriculadoDto,
  CreateAlumnoSeccionDto,
  FiltroAlumnoSecionDto,
} from '../dtos/alumno-seccion.dto';

@Controller('alumno-seccion')
export class AlumnoSeccionController {
  constructor(private alumnoSeccionSrv: AlumnoSeccionService) {}

  @Post()
  create(@Body() createDto: CreateAlumnoSeccionDto) {
    return this.alumnoSeccionSrv.create(createDto);
  }

  @Post('remove-alumnos')
  remove(@Body() createDto: CreateAlumnoSeccionDto) {
    return this.alumnoSeccionSrv.removeAlumnos(createDto);
  }

  @Post('nuevo')
  nuevoMatriculado(@Body() createDto: CreateAlumnoMatriculadoDto) {
    return this.alumnoSeccionSrv.addAlumnoNuevo(createDto);
  }

  @Get('temporada/:temporadaId/grado/:gradoId/seccion/:seccionId/alumnos')
  getMany(@Param() filtroDto: FiltroAlumnoSecionDto) {
    console.log(filtroDto);
    return this.alumnoSeccionSrv.getMany(filtroDto);
  }
}
