import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlumnoSeccion } from '../entitties/alumno-seccion.entity';
import { Repository } from 'typeorm';
import {
  CreateAlumnoMatriculadoDto,
  CreateAlumnoSeccionDto,
  FiltroAlumnoSecionDto,
} from '../dtos/alumno-seccion.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AlumnoSeccionService {
  constructor(
    @InjectRepository(AlumnoSeccion)
    private alumnoSeccionRepo: Repository<AlumnoSeccion>,

    @InjectRepository(Usuario)
    private usuarioSrv: Repository<Usuario>,
  ) {}

  async create(createDto: CreateAlumnoSeccionDto) {
    const { seccionId, alumnosIds, temporadaId, gradoId } = createDto;

    const alumnos = await this.getMany({ seccionId, gradoId, temporadaId });

    const alumnosExistentes = alumnos.map((u) => u.id);
    const alumnosAgregar = alumnosIds.filter(
      (id) => !alumnosExistentes.includes(id),
    );

    const createMany = alumnosAgregar.map((alumnosId) => {
      return this.alumnoSeccionRepo.create({
        alumno: { id: alumnosId },
        seccion: { id: seccionId },
        grado: { id: gradoId },
        temporada: { id: temporadaId },
      });
    });

    await this.alumnoSeccionRepo.save(createMany);

    return {
      message: 'Alumnos insertados correctamente',
    };
  }

  removeAlumnos(createDto: CreateAlumnoSeccionDto) {
    const { seccionId, alumnosIds, temporadaId, gradoId } = createDto;

    alumnosIds.map((alumnoId) => {
      return this.alumnoSeccionRepo.delete({
        alumno: { id: alumnoId },
        seccion: { id: seccionId },
        grado: { id: gradoId },
        temporada: { id: temporadaId },
      });
    });

    return {
      message: 'Alumnos eliminados',
    };
  }

  async addAlumnoNuevo(dto: CreateAlumnoMatriculadoDto) {
    const { seccionId, temporadaId, gradoId, alumno } = dto;
    const { nickname, nombre, password } = alumno;

    const nuevoAlumno = this.usuarioSrv.create({
      nickname,
      nombre,
      password,
    });

    await this.usuarioSrv.save(nuevoAlumno);

    const nuevoMatriculado = this.alumnoSeccionRepo.create({
      alumno: { id: nuevoAlumno.id },
      seccion: { id: seccionId },
      grado: { id: gradoId },
      temporada: { id: temporadaId },
    });

    await this.alumnoSeccionRepo.save(nuevoMatriculado);

    return nuevoMatriculado;
  }

  getMany(filtroDto: FiltroAlumnoSecionDto) {
    const { seccionId, gradoId, temporadaId } = filtroDto;
    return this.alumnoSeccionRepo.query<Usuario[]>(`
        select as2.id "asId", u.id, u.nombre, u.nickname from alumno_seccion as2 
          inner join usuario u on u.id = as2."alumnoId"
        where as2."seccionId"  = ${seccionId}
        and as2."gradoId" = ${gradoId}
        and as2."temporadaId" = ${temporadaId}
    `);
  }
}
