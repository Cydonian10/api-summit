import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto, UpdateCursoDto } from '../dtos/curso.dto';
import { Seccion } from '../entitties/seccion.entity';
import { CreateSeccionDto, UpdateSeccionDto } from '../dtos/seccion.dto';

@Injectable()
export class SeccionService {
  constructor(
    @InjectRepository(Seccion) private seccionRepo: Repository<Seccion>,
  ) {}

  async getMany() {
    const result = await this.seccionRepo.query(`
        select s.id,
          s.nombre,
          count(gs."gradoId") totalgrados
        from seccion s
          left join grado_seccion gs on gs."seccionId"  = s.id
        group by
          s.id, s.nombre
    `);

    return result.map((re: any) => ({
      ...re,
      totalgrados: parseInt(re.totalgrados),
    }));
  }

  getOne(id: Seccion['id']) {
    return this.seccionRepo.findOneBy({
      id,
    });
  }

  create(createDto: CreateSeccionDto) {
    const curso = this.seccionRepo.create(createDto);
    return this.seccionRepo.save(curso);
  }

  async update(updateDto: UpdateSeccionDto, seccionId: number) {
    const result = await this.seccionRepo.update(seccionId, {
      nombre: updateDto.nombre,
    });
    if (result.affected === 0) {
      throw new NotFoundException('Seccion no encontrado');
    }
    return this.seccionRepo.findOne({ where: { id: seccionId } });
  }

  delete(seccionId: number[]) {
    return this.seccionRepo.delete(seccionId);
  }
}
