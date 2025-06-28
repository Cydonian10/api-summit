import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { glob } from 'glob';
import { join } from 'path';
import { UsuariosService } from './usuarios/services/usuario.service';
import { UsuariosController } from './usuarios/controllers/usuarios.controllers';
import { JwtModule } from '@nestjs/jwt';

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
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class AppModule {}
