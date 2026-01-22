import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaModule } from './Carona/carona.module';
import { Carona } from './Carona/entities/carona.entity';
import { Reserva } from './Reserva/entities/reserva.entity';
import { ReservaModule } from './Reserva/reserva.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_meleva',
      entities: [Usuario, Carona, Reserva],
      synchronize: true,
    }),
    UsuarioModule,
    CaronaModule,
    ReservaModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
