import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';
import { CaronaModule } from './Carona/carona.module';
import { ReservaModule } from './Reserva/reserva.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    UsuarioModule,
    CaronaModule,
    ReservaModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
