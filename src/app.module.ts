import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';

import { Post, Tag, User } from './entities';

@Module({
  imports: [
    MikroOrmModule.forRoot()],
})
export class AppModule {}
