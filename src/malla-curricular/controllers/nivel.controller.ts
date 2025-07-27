import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CretaeNivelDto,
  InsertGradoNivelDto,
  UpdateNivelDto,
} from '../dtos/nivel.dto';
import { NivelService } from '../services/nivel.service';

@Controller('niveles')
export class NivelController {
  constructor(private nivelSrv: NivelService) {}

  @Post()
  async create(@Body() createDto: CretaeNivelDto) {
    const nivel = await this.nivelSrv.create(createDto);
    return nivel;
  }

  @Put(':id/insert-grado-nivel')
  async addGradosToNivel(
    @Body() updateDto: InsertGradoNivelDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const nivel = await this.nivelSrv.addGradosToNivel(id, updateDto.gradoIds);
    return nivel;
  }

  @Get()
  async getMany() {
    return this.nivelSrv.getMany();
  }

  @Get(':nivelId/grados')
  async grados(@Param('nivelId', ParseIntPipe) nivelId: number) {
    return this.nivelSrv.grados(nivelId);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.nivelSrv.getOne(id);
  }

  @Put(':id')
  async update(
    @Body() updateDto: UpdateNivelDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const nivel = await this.nivelSrv.update(updateDto, id);
    return nivel;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const nivel = await this.nivelSrv.removeNivel(id);
    return nivel;
  }
}
