import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { glob } from 'glob';
import { join } from 'path';
import { UsuariosService } from './usuarios/services/usuario.service';
import { UsuariosController } from './usuarios/controllers/usuarios.controllers';
import { JwtModule } from '@nestjs/jwt';
import { NivelController } from './malla-curricular/controllers/nivel.controller';
import { NivelService } from './malla-curricular/services/nivel.service';
import { CursoController } from './malla-curricular/controllers/curso.controller';
import { CursoService } from './malla-curricular/services/curso.service';
import { SeccionController } from './malla-curricular/controllers/seccion.controller';
import { SeccionService } from './malla-curricular/services/seccion.service';
import { GradoController } from './malla-curricular/controllers/grado.controller';
import { GradoService } from './malla-curricular/services/grado.service';
import { TemporadaController } from './malla-curricular/controllers/temporada.controller';
import { TemporadaService } from './malla-curricular/services/temporada.service';
import { AlumnoSeccionService } from './malla-curricular/services/alumno-seccion.service';
import { AlumnoSeccionController } from './malla-curricular/controllers/alumno-seccion.controller';
import { JwtStrategy } from './usuarios/guards/jwt-auth.strategy';
import { GrupoController } from './summit/controllers/grupo.controller';
import { GrupoService } from './summit/services/grupo.service';
import { CronogramaController } from './summit/controllers/cronograma.controller';
import { CronogramaService } from './summit/services/cronograma.service';
import { CursoEvaluarController } from './summit/controllers/curso-evaluar.controller';
import { CursoEvaluarService } from './summit/services/curso-evaluar.service';
import { SeccionCursoEvaluarService } from './summit/services/seccion-curso-evaluar.service';
import { SeccionCursoEvaluarController } from './summit/controllers/seccion-curso-evaluar.controller';

const entityFiles = glob.sync(join(__dirname, '**', '*.entity.{ts,js}'));
const entities = entityFiles.map((file) => require(file));
const extractedEntities = entities.map((mod) => Object.values(mod)).flat();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'summit_db',
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
      dropSchema: false,
    }),
    TypeOrmModule.forFeature(extractedEntities),
    JwtModule.register({
      global: true,
      secret: 'kasdjfñaksdjfñaksdjfñalksdjf',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [
    UsuariosController,
    NivelController,
    CursoController,
    SeccionController,
    GradoController,
    TemporadaController,
    AlumnoSeccionController,
    GrupoController,
    CronogramaController,
    CursoEvaluarController,
    SeccionCursoEvaluarController,
  ],
  providers: [
    UsuariosService,
    NivelService,
    CursoService,
    SeccionService,
    GradoService,
    TemporadaService,
    AlumnoSeccionService,
    GrupoService,
    JwtStrategy,
    CronogramaService,
    CursoEvaluarService,
    SeccionCursoEvaluarService,
  ],
})
export class AppModule {}
