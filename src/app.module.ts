import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaModule } from './Caronas/carona.module';
import { Carona } from './Caronas/entities/carona.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_app_me_leva',
      entities: [Carona],
      synchronize: true,
    }),
    CaronaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
