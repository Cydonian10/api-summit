import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from '../entitties/curso.entity';
import { Repository } from 'typeorm';
import { CreateCursoDto, UpdateCursoDto } from '../dtos/curso.dto';

@Injectable()
export class CursoService {
  constructor(@InjectRepository(Curso) private cursoRepo: Repository<Curso>) {}

  async getMany() {
    const result = await this.cursoRepo.query(`
      select c.id,
        c.nombre,
        count(gs."gradoId") totalgrados
      from curso c
        left join grado_curso gs on gs."cursoId" = c.id
      group by
        c.id, c.nombre
    `);

    return result.map((re: any) => ({
      ...re,
      totalgrados: parseInt(re.totalgrados),
    }));
  }

  getOne(id: Curso['id']) {
    return this.cursoRepo.findOneBy({
      id,
    });
  }

  create(createDto: CreateCursoDto) {
    const curso = this.cursoRepo.create(createDto);
    return this.cursoRepo.save(curso);
  }

  async update(updateDto: UpdateCursoDto, cursoId: number) {
    const result = await this.cursoRepo.update(cursoId, {
      nombre: updateDto.nombre,
    });
    if (result.affected === 0) {
      throw new NotFoundException('Curso no encontrado');
    }
    return this.cursoRepo.findOne({ where: { id: cursoId } });
  }

  delete(cursoId: number) {
    return this.cursoRepo.delete(cursoId);
  }
}
