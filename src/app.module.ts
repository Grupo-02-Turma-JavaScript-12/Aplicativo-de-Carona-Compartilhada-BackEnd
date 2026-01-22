import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Usuario/entities/usuario.entity';
import { UsuarioModule } from './Usuario/usuario.module';
import { Carona } from './Carona/entities/carona.entity';
import { Reserva } from './Reserva/entities/reserva.entity';
import { CaronaModule } from './Carona/carona.module';
import { ReservaModule } from './Reserva/reserva.module';

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
