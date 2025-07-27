import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grado } from '../entitties/grado.entity';
import { In, Repository } from 'typeorm';
import { CreateGradoDto } from '../dtos/grado.dto';
import { Curso } from '../entitties/curso.entity';
import { Seccion } from '../entitties/seccion.entity';
import { UpdateNivelDto } from '../dtos/nivel.dto';
import { Nivel } from '../entitties/nivel.entity';

@Injectable()
export class GradoService {
  constructor(
    @InjectRepository(Grado) private gradoRepo: Repository<Grado>,
    @InjectRepository(Curso) private cursoRepo: Repository<Curso>,
    @InjectRepository(Nivel) private nivelRepo: Repository<Nivel>,
    @InjectRepository(Seccion) private seccionRepo: Repository<Seccion>,
  ) {}

  async getMany() {
    const grados = await this.gradoRepo.query<any[]>(`
      SELECT 
        g.*,
        n.nombre nivel,
        (
          SELECT COUNT(*) 
          FROM grado_curso gc 
          WHERE gc."gradoId" = g.id
        ) AS "totalCursos",
        (
          SELECT COUNT(*) 
          FROM grado_seccion gs 
          WHERE gs."gradoId" = g.id
        ) AS "totalSecciones"
      FROM grado g
        left JOIN nivel n on n.id = g."nivelId";
    `);

    return grados.map((re) => ({
      ...re,
      totalCursos: +re.totalCursos,
      totalSecciones: +re.totalSecciones,
    }));
  }

  getOne(gradoId: number) {
    return this.gradoRepo.findOne({
      where: { id: gradoId },
      relations: {
        secciones: true,
        cursos: true,
        nivel: true,
      },
    });
  }

  async getSecciones(gradoId: Grado['id']) {
    const result = await this.seccionRepo.query(`
        select 
          s.id,
          s.nombre
        from seccion s
          left join grado_seccion gs on gs."seccionId"  = s.id
        where gs."gradoId" = ${gradoId}
    `);

    return result;
  }

  async getGradoCursos(gradoId: Grado['id']) {
    const result = await this.seccionRepo.query(`
        select 
          s.id,
          s.nombre
        from curso s
          left join grado_curso gs on gs."cursoId"  = s.id
        where gs."gradoId" = ${gradoId}
    `);

    return result;
  }

  async create(createDto: CreateGradoDto) {
    const { nombre, cursosIds, seccionesIds, nivelId } = createDto;

    const cursos = await this.cursoRepo.findBy({
      id: In(cursosIds),
    });

    const secciones = await this.seccionRepo.findBy({
      id: In(seccionesIds),
    });

    if (nivelId) {
      const nivel = await this.nivelRepo.findOne({
        where: {
          id: nivelId,
        },
      });
      const newGrado = this.gradoRepo.create({
        nombre,
        cursos,
        secciones,
        nivel,
      });
      return this.gradoRepo.save(newGrado);
    }
    const newGrado = this.gradoRepo.create({
      nombre,
      cursos,
      secciones,
    });
    return this.gradoRepo.save(newGrado);
  }

  async update(updateDto: UpdateNivelDto, gradoId: number) {
    const result = await this.gradoRepo.update(gradoId, {
      nombre: updateDto.nombre,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Grado no encontrado');
    }

    return this.gradoRepo.findOne({
      where: { id: gradoId },
      relations: { nivel: true },
    });
  }

  async insertSeccionesToGrado(gradoId: number, seccionesIds: number[]) {
    const grado = await this.gradoRepo.findOne({
      where: { id: gradoId },
      relations: {
        secciones: true,
      },
    });

    if (!grado) throw new NotFoundException('Grado no encontrado');

    const nuevasSecciones = await this.seccionRepo.findBy({
      id: In(seccionesIds),
    });

    const seccionesExistentes = grado.secciones.map((s) => s.id);
    const seccionesAgregar = nuevasSecciones.filter(
      (s) => !seccionesExistentes.includes(s.id),
    );

    /** Eliminar Secciones */
    const seccionesEliminar = seccionesExistentes.filter(
      (s) => !seccionesIds.includes(s),
    );

    grado.secciones = grado.secciones.filter(
      (seccion) => !seccionesEliminar.includes(seccion.id),
    );

    await this.gradoRepo.save(grado);
    /** Fin Eliminar */

    grado.secciones = [...grado.secciones, ...seccionesAgregar];

    return this.gradoRepo.save(grado);
  }

  async insertCursosToGrado(gradoId: number, cursosIds: number[]) {
    const grado = await this.gradoRepo.findOne({
      where: { id: gradoId },
      relations: {
        cursos: true,
      },
    });

    if (!grado) throw new NotFoundException('Grado no encontrado');

    const nuevosCursos = await this.cursoRepo.findBy({
      id: In(cursosIds),
    });

    const cursosExistentes = grado.cursos.map((c) => c.id);
    const cursosAgregar = nuevosCursos.filter(
      (c) => !cursosExistentes.includes(c.id),
    );

    /** Eliminar Secciones */
    const cursosEliminar = cursosExistentes.filter(
      (s) => !cursosIds.includes(s),
    );

    grado.cursos = grado.cursos.filter(
      (curso) => !cursosEliminar.includes(curso.id),
    );

    await this.gradoRepo.save(grado);
    /** Fin Eliminar */

    grado.cursos = [...grado.cursos, ...cursosAgregar];

    return this.gradoRepo.save(grado);
  }
}
