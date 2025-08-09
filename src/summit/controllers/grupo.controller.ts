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
import { GrupoService } from '../services/grupo.service';
import {
  DeleteGrupoDto,
  FiltroCantidadAlumnos,
  GeneraGrupoDto,
  UpdateGrupoAlumnoDto,
} from '../dtos/grupo/genera-grupo.dto';

@Controller('grupos')
export class GrupoController {
  constructor(private grupoSrv: GrupoService) {}

  @Post()
  generarGrupos(@Body() dto: GeneraGrupoDto) {
    return this.grupoSrv.generarGrupos(dto);
  }

  @Get('temporada/:temporadaId/grado/:gradoId/seccion/:seccionId')
  getGrupos(@Param() dto: FiltroCantidadAlumnos) {
    return this.grupoSrv.getGrupos(dto);
  }

  @Delete('temporada/:temporadaId/grado/:gradoId/seccion/:seccionId')
  eliminarGrupos(@Param() dto: DeleteGrupoDto) {
    return this.grupoSrv.eliminarGrupos(dto);
  }

  @Put('mover-alumno')
  async moveAlumnoGrupo(@Body() dto: UpdateGrupoAlumnoDto) {
    return this.grupoSrv.moveAlumnoGrupo(dto);
  }

  @Delete(':id')
  async eliminarGrupo(@Param('id', ParseIntPipe) id: number) {
    return this.grupoSrv.eliminarGrupo(id);
  }
}
