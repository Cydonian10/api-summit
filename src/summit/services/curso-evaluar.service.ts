import { InjectRepository } from '@nestjs/typeorm';
import { Entity, In, Repository } from 'typeorm';
import { CursoEvaluar } from '../entities/curso-evaluar.entity';
import { Grado } from 'src/malla-curricular/entitties/grado.entity';
import { SeccionCursoEvaluacion } from '../entities/seccion-curso-evalucion.entity';
import { CrearCursoEvaluarDto } from '../dtos/curso-evaluar/create-curso-evaluar.dto';

@Entity()
export class CursoEvaluarService {
  constructor(
    @InjectRepository(CursoEvaluar)
    private cursoEvaluarRepo: Repository<CursoEvaluar>,

    @InjectRepository(Grado)
    private gradoRepo: Repository<Grado>,

    @InjectRepository(SeccionCursoEvaluacion)
    private seccionCursoEvaluacion: Repository<SeccionCursoEvaluacion>,
  ) {}

  async create(dto: CrearCursoEvaluarDto) {
    // creo el curso a evaluar pra un grados o grados
    const datos = dto.gradoIds.map((gradoId) => ({
      gradoId,
      cronogramaId: dto.cronogramaId,
      evaluadorId: dto.evaluadorId,
      cursoId: dto.cursoId,
    }));

    // la seccion curso evaluacion
    const { identifiers } = await this.cursoEvaluarRepo.insert(datos);

    let seccionIds: number[] = [];

    for (let i = 0; i < dto.gradoIds.length; i++) {
      const result = (
        await this.gradoRepo.query<{ seccionId: number }[]>(`
        select gs."seccionId" from grado_seccion gs
	      where gs."gradoId" = ${dto.gradoIds[i]}
    `)
      ).map((re) => re.seccionId);

      seccionIds = [...seccionIds, ...result];
    }

    let datos2 = identifiers.flatMap((ide) => {
      return seccionIds.map((seccionId) => ({
        fechaInicio: new Date(),
        cursoEvaluarId: ide.id,
        seccionId: seccionId,
        nota: 0,
      }));
    });

    await this.seccionCursoEvaluacion.insert(datos2);

    return {
      message:
        'Cursos evaluar y curso evaluar por seccion creados correctamente',
    };
  }

  async update(dto: CrearCursoEvaluarDto) {
    try {
      const cursosEvaluarActuales = await this.cursoEvaluarRepo.find({
        where: {
          cronograma: { id: dto.cronogramaId },
          curso: { id: dto.cursoId },
          evaluador: { id: dto.evaluadorId },
        },
        relations: { grado: true },
      });

      const gradosIdsActuales = cursosEvaluarActuales.map((c) => c.grado.id);
      const gradosIdsNuevos = dto.gradoIds;

      // Detectar los grados a agregar y quitar
      const gradosAgregar = gradosIdsNuevos.filter(
        (id) => !gradosIdsActuales.includes(id),
      );

      const gradosAEliminar = gradosIdsActuales.filter(
        (id) => !gradosIdsNuevos.includes(id),
      );
      console.log({ gradosAEliminar, gradosAgregar });

      // elimino curso evaluar cuyos grados no estan
      if (gradosAEliminar.length) {
        const hola = await this.cursoEvaluarRepo.find({
          where: {
            cronograma: { id: dto.cronogramaId },
            curso: { id: dto.cursoId },
            evaluador: { id: dto.evaluadorId },
            grado: In(gradosAEliminar),
          },
        });

        await this.cursoEvaluarRepo.remove(hola);
      }

      if (gradosAgregar.length) {
        const nuevosDatos = gradosAgregar.map((gradoId) => ({
          gradoId,
          cronogramaId: dto.cronogramaId,
          evaluadorId: dto.evaluadorId,
          cursoId: dto.cursoId,
        }));
        const { identifiers } = await this.cursoEvaluarRepo.insert(nuevosDatos);

        let seccionIds: number[] = [];

        for (const gradoId of gradosAgregar) {
          const result = (
            await this.gradoRepo.query<{ seccionId: number }[]>(`
          select gs."seccionId" from grado_seccion gs
          where gs."gradoId" = ${gradoId}
        `)
          ).map((r) => r.seccionId);

          seccionIds = [...seccionIds, ...result];
        }

        const nuevosEvaluarSecciones = identifiers.flatMap((ide) =>
          seccionIds.map((seccionId) => ({
            fechaInicio: new Date(),
            cursoEvaluarId: ide.id,
            seccionId,
            nota: 0,
          })),
        );

        await this.seccionCursoEvaluacion.insert(nuevosEvaluarSecciones);
      }

      return {
        message:
          'Cursos evaluar y curso evluar por seccion actualizados correctamente',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCursosEvaluar(cronogramaId: number, gradoId: number) {
    const cursosEvaluar = await this.cursoEvaluarRepo.find({
      where: {
        cronogramaId,
        gradoId,
      },
      relations: {
        curso: true,
        evaluador: true,
      },
    });
    return cursosEvaluar;
  }
}
