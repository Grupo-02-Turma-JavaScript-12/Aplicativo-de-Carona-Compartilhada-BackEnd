import { Module } from '@nestjs/common';
import { Carona } from './entities/carona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Carona])],
  providers: [],
  controllers: [],
  exports: [],
})
export class CaronaModule {}
