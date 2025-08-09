import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { SeccionCursoEvaluarService } from '../services/seccion-curso-evaluar.service';
import { UpdateFechaDto } from '../dtos/seccion-curso-evaluar/update-fecha.dto';

@Controller('seccion-curso-evaluar')
export class SeccionCursoEvaluarController {
  constructor(private seccionCursoEvaluarSrv: SeccionCursoEvaluarService) {}

  @Get('cursoEvaluar/:cursoEvaluarId')
  getSeccionPorCursoEvaluar(
    @Param('cursoEvaluarId', ParseIntPipe) cursoEvaluarId: number,
  ) {
    return this.seccionCursoEvaluarSrv.getSeccionPorCursoEvaluar(
      cursoEvaluarId,
    );
  }

  @Put(':id')
  updateFechaInicio(
    @Body() dto: UpdateFechaDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.seccionCursoEvaluarSrv.updateFechaInicio(dto, id);
  }
}
