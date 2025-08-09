import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cronograma } from '../entities/cronograma.entity';
import { Repository } from 'typeorm';
import { CreateCronogramaDto } from '../dtos/cronograma/cronograma.dto';
import { FiltroCronogramaDto } from '../dtos/cronograma/filtro.dto';
import { Temporada } from 'src/malla-curricular/entitties/temporada.entity';
import { UpdateCronogramaDto } from '../dtos/cronograma/cronograma-update.dto';
import { Fase } from '../entities/fases.entity';

@Injectable()
export class CronogramaService {
  constructor(
    @InjectRepository(Cronograma)
    private cronogramaRepo: Repository<Cronograma>,

    @InjectRepository(Temporada)
    private temporadaRepo: Repository<Temporada>,

    @InjectRepository(Fase)
    private faseRepo: Repository<Fase>,
  ) {}

  async create(dto: CreateCronogramaDto) {
    const temporadaDb = await this.temporadaRepo.findOne({
      where: { id: dto.temporadaId },
    });
    const nuevoCronograma = this.cronogramaRepo.create({
      inicio: dto.fechaInicio,
      fin: dto.fechaFin,
      nombre: dto.nombre,
      temporada: temporadaDb,
      fases: dto.fases.map((fase) => ({
        nombre: fase.nombre,
        fechaInicio: fase.fechaInicio,
        fechaFin: fase.fechaFin,
      })),
    });

    return this.cronogramaRepo.save(nuevoCronograma);
  }

  async getAll(dto: FiltroCronogramaDto) {
    const temporadaDb = await this.temporadaRepo.findOne({
      where: { id: dto.temporadaId },
    });
    console.log(temporadaDb);
    return this.cronogramaRepo.find({
      relations: {
        fases: true,
      },
      where: {
        temporada: temporadaDb!,
      },
    });
  }

  async update(id: number, dto: UpdateCronogramaDto) {
    const cronograma = await this.cronogramaRepo.findOne({
      where: { id },
      relations: ['fases'], // importante para manejar relaciones
    });

    if (!cronograma) {
      throw new NotFoundException('Cronograma no encontrado');
    }

    const temporada = await this.temporadaRepo.findOneByOrFail({
      id: dto.temporadaId,
    });

    // Actualizamos los campos base
    cronograma.nombre = dto.nombre;
    cronograma.inicio = dto.fechaInicio;
    cronograma.fin = dto.fechaFin;
    cronograma.temporada = temporada;

    // Manejo de fases
    const fasesActuales = cronograma.fases || [];

    console.log(cronograma);

    const nuevasFases: Fase[] = [];

    for (const faseDto of dto.fases) {
      if (faseDto.id) {
        // Buscar fase existente
        const faseExistente = fasesActuales.find((f) => f.id === faseDto.id);
        if (faseExistente) {
          faseExistente.nombre = faseDto.nombre;
          faseExistente.fechaInicio = faseDto.fechaInicio;
          faseExistente.fechaFin = faseDto.fechaFin;
          nuevasFases.push(faseExistente);
        }
      } else {
        // Nueva fase
        const nueva = new Fase();
        nueva.nombre = faseDto.nombre;
        nueva.fechaInicio = faseDto.fechaInicio;
        nueva.fechaFin = faseDto.fechaFin;
        nueva.cronograma = cronograma;
        nuevasFases.push(nueva);
      }
    }

    // Detectar y eliminar fases eliminadas
    const idsDto = dto.fases.filter((f) => f.id).map((f) => f.id);
    const fasesAEliminar = fasesActuales.filter((f) => !idsDto.includes(f.id));

    if (fasesAEliminar.length > 0) {
      await this.faseRepo.remove(fasesAEliminar);
    }

    // Asignar las nuevas fases
    cronograma.fases = nuevasFases;

    const cronogrma = this.cronogramaRepo.save(cronograma);

    cronograma.fases?.forEach((f) => delete f.cronograma);

    return cronograma;
  }

  async delete(cronogramaId: number) {
    return this.cronogramaRepo.delete({ id: cronogramaId });
  }
}
