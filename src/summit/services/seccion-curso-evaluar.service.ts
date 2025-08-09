import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SeccionCursoEvaluacion } from '../entities/seccion-curso-evalucion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFechaDto } from '../dtos/seccion-curso-evaluar/update-fecha.dto';

@Injectable()
export class SeccionCursoEvaluarService {
  constructor(
    @InjectRepository(SeccionCursoEvaluacion)
    private seccionCursoEvaluarRepo: Repository<SeccionCursoEvaluacion>,
  ) {}

  getSeccionPorCursoEvaluar(cursoEvaluarId: number) {
    const cursosEvaluar = this.seccionCursoEvaluarRepo.find({
      where: {
        cursoEvaluarId,
      },
      relations: {
        seccion: true,
      },
    });

    return cursosEvaluar;
  }

  async updateFechaInicio(dto: UpdateFechaDto, id: number) {
    const resp = await this.seccionCursoEvaluarRepo
      .createQueryBuilder()
      .update()
      .set({ fechaInicio: dto.fechaInicio })
      .where('id = :id', { id: id })
      .execute();

    return resp;
  }
}
