import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../services/usuario.service';
import { UsuarioCreateDto } from '../dtos/usuario-create.dto';
import { SignInDto } from '../dtos/sing-in.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioSrv: UsuariosService) {}

  @Get()
  getAll() {
    return this.usuarioSrv.getAll();
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const jwt = await this.usuarioSrv.signIn(signInDto);
    return jwt;
  }

  @Post()
  async create(@Body() createDto: UsuarioCreateDto) {
    const newUsuario = await this.usuarioSrv.create(createDto);
    return newUsuario;
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@GetUser() user: { id: number }) {
    return this.usuarioSrv.getOne(user.id);
  }
}
