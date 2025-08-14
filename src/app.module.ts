import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';

import { Post, Tag, User } from './entities';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      entities: [User, Post, Tag],
      dbName: 'test',
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MikroOrmModule.forFeature([User, Post, Tag]),
  ],
})
export class AppModule {}
