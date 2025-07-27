import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nivel } from '../entitties/nivel.entity';
import { In, Repository } from 'typeorm';
import { CretaeNivelDto, UpdateNivelDto } from '../dtos/nivel.dto';
import { Grado } from '../entitties/grado.entity';

@Injectable()
export class NivelService {
  constructor(
    @InjectRepository(Nivel) private nivelRepo: Repository<Nivel>,
    @InjectRepository(Grado) private gradoRepo: Repository<Grado>,
  ) {}

  async getMany() {
    const niveles = await this.nivelRepo.find({
      relations: { grados: true },
    });
    return niveles;
  }

  async grados(nivelId: number) {
    return await this.gradoRepo.find({
      where: {
        nivelId: nivelId,
      },
    });
  }

  async getOne(id: number) {
    const niveles = await this.nivelRepo.findOne({
      relations: { grados: true },
      where: { id },
    });
    return niveles;
  }

  async create(createDto: CretaeNivelDto) {
    const { nombre, gradoIds } = createDto;

    const grados = await this.gradoRepo.findBy({
      id: In(gradoIds),
    });

    const gradosInsertar = grados.filter((grado) => grado.nivelId === null);

    const nuevoNivel = this.nivelRepo.create({
      nombre,
      grados: gradosInsertar,
    });

    return this.nivelRepo.save(nuevoNivel);
  }

  async update(updateDto: UpdateNivelDto, nivelId: number) {
    const result = await this.nivelRepo.update(nivelId, {
      nombre: updateDto.nombre,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Nivel no encontrado');
    }

    return this.nivelRepo.findOne({ where: { id: nivelId } });
  }

  async addGradosToNivel(nivelId: number, gradoIds: number[]) {
    const nivel = await this.nivelRepo.findOne({
      where: { id: nivelId },
      relations: {
        grados: true,
      },
    });
    if (!nivel) throw new NotFoundException('Nivel no encontrado');
    const nuevosGrados = await this.gradoRepo.findBy({ id: In(gradoIds) });
    const gradosExistentes = nivel.grados.map((g) => g.id);
    const gradosAgregar = nuevosGrados.filter(
      (g) => !gradosExistentes.includes(g.id),
    );

    const gradosEliminar = gradosExistentes.filter(
      (g) => !gradoIds.includes(g),
    );

    if (gradosEliminar.length > 0) {
      nivel.grados = nivel.grados.filter(
        (grado) => !gradosEliminar.includes(grado.id),
      );
      await this.nivelRepo.save(nivel);
    }

    nivel.grados = [...nivel.grados, ...gradosAgregar];

    return this.nivelRepo.save(nivel);
  }

  async removeNivel(nivelId: number) {
    return this.nivelRepo.delete(nivelId);
  }
}
