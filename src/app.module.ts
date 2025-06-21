import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Nivel } from './malla-curricular/entitties/nivel.entity';
import { Grado } from './malla-curricular/entitties/grado.entity';
import { Seccion } from './malla-curricular/entitties/seccion.entity';
import { glob } from 'glob';
import { join } from 'path';

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
      //      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      ssl: false,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature(extractedEntities),
  ],
  controllers: [AppController, UsuariosController],
  providers: [AppService],
})
export class AppModule {}
