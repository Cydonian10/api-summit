import {
  Get,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioCreateDto } from '../dtos/usuario-create.dto';
import { SignInDto } from '../dtos/sing-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    private jwtSrv: JwtService,
  ) {}

  getAll() {
    return this.usuarioRepo.find();
  }

  async getOne(id: number) {
    const { password, ...user } = await this.usuarioRepo.findOne({
      where: { id },
    });
    return user;
  }

  async create(createDto: UsuarioCreateDto) {
    const newUsuario = this.usuarioRepo.create(createDto);
    await this.usuarioRepo.save(newUsuario);
    return newUsuario;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usuarioRepo.findOneBy({
      nickname: signInDto.nickname,
    });

    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };

    return {
      token: await this.jwtSrv.signAsync(payload),
    };
  }
}
