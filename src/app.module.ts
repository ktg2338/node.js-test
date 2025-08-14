import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/**/*.entity.js'],
      dbName: 'test.db',
      driver: SqliteDriver,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostsModule,
  ],
})
export class AppModule {}
