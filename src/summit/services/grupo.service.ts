import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Grupo } from '../entities/grupo.entity';
import {
  DeleteGrupoDto,
  FiltroCantidadAlumnos,
  GeneraGrupoDto,
  UpdateGrupoAlumnoDto,
} from '../dtos/grupo/genera-grupo.dto';
import { AlumnoSeccion } from 'src/malla-curricular/entitties/alumno-seccion.entity';
import { AlumnoSeccionService } from 'src/malla-curricular/services/alumno-seccion.service';
import { AlumnoGrupo } from '../entities/alumno-grupo.entity';

@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(Grupo)
    private grupoRepo: Repository<Grupo>,

    @InjectRepository(AlumnoSeccion)
    private alumnoSeccionRepo: Repository<AlumnoSeccion>,

    @InjectRepository(AlumnoGrupo)
    private alumnoGrupoRepo: Repository<AlumnoGrupo>,

    private alumnoSeccionSrv: AlumnoSeccionService,
  ) {}

  async generarGrupos(dto: GeneraGrupoDto) {
    const { seccionId, gradoId, cantidadAlumnos, temporadaId } = dto;
    const totalAlumnos = await this.cantidadDeAumnosPorSeccion({
      temporadaId,
      seccionId: seccionId,
      gradoId,
    });

    const cantidadGrupos = Math.floor(totalAlumnos / cantidadAlumnos);
    const sobrantes = totalAlumnos % cantidadAlumnos;

    const alumnos = await this.alumnoSeccionSrv.getMany({
      gradoId,
      seccionId,
      temporadaId,
    });

    const grupos: number[] = Array.from(
      { length: cantidadGrupos },
      () => cantidadAlumnos,
    );

    if (sobrantes > 0) {
      grupos.push(sobrantes);
    }

    const gruposSave: {
      seccionId: number;
      gradoId: number;
      cantidadAlumnos: number;
      nombre: string;
      temporadaId: number;
    }[] = grupos.map((grupo, index) => {
      return {
        seccionId,
        gradoId,
        temporadaId,
        cantidadAlumnos: grupo,
        nombre: `grupo ${index + 1}`,
      };
    });

    const { raw: gruposIds } = await this.grupoRepo.insert(gruposSave);

    let alumnosGrupoSave: any[] = [];
    for (let j = 0; j < gruposIds.length; j++) {
      const start = j * cantidadAlumnos;
      const end = start + cantidadAlumnos;
      let alumnosChunk = alumnos.slice(start, end);

      for (let index = 0; index < cantidadAlumnos; index++) {
        if (alumnosChunk[index]?.id) {
          alumnosGrupoSave.push({
            alumnoId: alumnosChunk[index].id,
            grupoId: gruposIds[j].id,
            tipoAlumno: 'NORMAL',
          });
        }
      }
    }
    await this.alumnoGrupoRepo.insert(alumnosGrupoSave);

    return {
      mesasge: 'Se generaron los grupos exitosamente',
    };
  }
  // const alumnosGrupoSave = gruposIds.flatMap((grupo, j) => {
  //   const start = j * cantidadAlumnos;
  //   const end = start + cantidadAlumnos;
  //   const chunk = alumnos.slice(start, end);

  //   return chunk
  //     .filter(alumno => alumno?.id)
  //     .map(alumno => ({
  //       alumnoId: alumno.id,
  //       grupoId: grupo.id,
  //       tipoAlumno: 'NORMAL',
  //     }));
  // });

  // if (alumnosGrupoSave.length) {
  //   await this.alumnoGrupo.insert(alumnosGrupoSave);
  // }

  async moveAlumnoGrupo(dto: UpdateGrupoAlumnoDto) {
    const { alumnoId, grupoId, grupoDestinoId } = dto;
    const grupo = await this.grupoRepo.findOne({ where: { id: grupoId } });
    const grupoDestinoCount = await this.alumnoGrupoRepo.count({
      where: { grupoId: grupoDestinoId },
    });
    if (grupoDestinoCount >= grupo.cantidadAlumnos + 1) {
      throw new BadRequestException('grupo esta lleno');
    }

    this.alumnoGrupoRepo
      .createQueryBuilder()
      .update('summit.alumno_grupo')
      .set({ grupoId: grupoDestinoId })
      .where('"alumnoId" = :alumnoId', { alumnoId })
      .andWhere('"grupoId" = :grupoId', { grupoId })
      .execute();

    return {
      message: 'Alumno grupo actulizado',
    };
  }

  getGrupos(dto: FiltroCantidadAlumnos) {
    return this.alumnoGrupoRepo.query(`
        SELECT 
          g.id AS "grupoId",
          g.nombre as grupo,
          g."cantidadAlumnos" as "cantidadAlumnos",
          json_agg(json_build_object(
            'id', u.id,
            'nombre', u.nombre,
            'grupoId', g.id
          )) AS alumnos
        FROM summit.alumno_grupo ag
        INNER JOIN summit.grupo g ON g.id = ag."grupoId"
        INNER JOIN usuario u ON u.id = ag."alumnoId"
        WHERE g."seccionId" = ${dto.seccionId}
          AND g."gradoId" = ${dto.gradoId} 
          AND g."temporadaId" = ${dto.temporadaId}
        GROUP BY g.id , g.nombre, g."cantidadAlumnos";
    `);
  }

  async eliminarGrupo(id: number) {
    const alumnos = await this.alumnoGrupoRepo.find({ where: { grupoId: id } });

    if (alumnos.length > 0) {
      throw new ConflictException('No se puede eliminar grupo tiene alumnos');
    }

    await this.grupoRepo.delete(id);

    return {
      message: 'Grupo se elimino correctamente',
    };
  }

  async eliminarGrupos(dto: DeleteGrupoDto) {
    const { raw } = await this.grupoRepo.delete({
      seccionId: dto.seccionId,
      gradoId: dto.gradoId,
      temporadaId: dto.temporadaId,
    });

    const idsEliminar = raw.map((r: { id: number }) => r.id);

    await this.alumnoGrupoRepo.delete({
      grupoId: In(idsEliminar),
    });

    return {
      message: 'Elimindo los grupos existosamente',
    };
  }

  cantidadDeAumnosPorSeccion(dto: FiltroCantidadAlumnos) {
    return this.alumnoSeccionRepo.count({
      where: {
        temporadaId: dto.temporadaId,
        gradoId: dto.gradoId,
        seccionId: dto.seccionId,
      },
    });
  }
}
