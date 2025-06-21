import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    @InjectRepository(Usuario) private usuario: Repository<Usuario>,
  ) {}

  @Get()
  prueba() {
    return this.usuario.find();
  }
}
