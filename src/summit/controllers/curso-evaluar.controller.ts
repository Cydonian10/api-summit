import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CrearCursoEvaluarDto } from '../dtos/curso-evaluar/create-curso-evaluar.dto';
import { CursoEvaluarService } from '../services/curso-evaluar.service';

@Controller('curso-evaluar')
export class CursoEvaluarController {
  constructor(private cursoEvaluarSrv: CursoEvaluarService) {}

  @Post()
  create(@Body() dto: CrearCursoEvaluarDto) {
    return this.cursoEvaluarSrv.create(dto);
  }

  @Put()
  update(@Body() dto: CrearCursoEvaluarDto) {
    return this.cursoEvaluarSrv.update(dto);
  }

  @Get('cronograma/:cronogramaId/grado/:gradoId')
  cursosEvaluar(
    @Param('cronogramaId', ParseIntPipe) cronogramaId: number,
    @Param('gradoId') gradoId: number,
  ) {
    return this.cursoEvaluarSrv.getCursosEvaluar(cronogramaId, gradoId);
  }
}
