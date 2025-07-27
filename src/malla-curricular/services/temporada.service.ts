import { InjectRepository } from '@nestjs/typeorm';
import { Temporada } from '../entitties/temporada.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemporadaDto, UpdateTemporadaDto } from '../dtos/temporada.dto';

@Injectable()
export class TemporadaService {
  constructor(
    @InjectRepository(Temporada) private temporadaRepo: Repository<Temporada>,
  ) {}

  getMany() {
    return this.temporadaRepo.find();
  }

  create(createDto: CreateTemporadaDto) {
    const temporada = this.temporadaRepo.create(createDto);
    return this.temporadaRepo.save(temporada);
  }

  async update(updateDto: UpdateTemporadaDto, temporadaId: number) {
    const result = await this.temporadaRepo.update(temporadaId, {
      nombre: updateDto.nombre,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Temporada no encontrado');
    }

    return this.temporadaRepo.findOne({ where: { id: temporadaId } });
  }

  delete(temporadaId: number) {
    return this.temporadaRepo.delete(temporadaId);
  }
}
