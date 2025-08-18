// mikro-orm.config.ts
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import 'reflect-metadata';

export default defineConfig({
  dbName: 'postgres',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  // 개발(ts-node)에서 읽을 경로
  entitiesTs: ['src/**/*.entity.ts', 'src/**/*.mikro-orm-entity.ts', 'src/**/entities/*.ts'],

  // 빌드(dist)에서 읽을 경로
  entities: ['dist/**/*.entity.js', 'dist/**/*.mikro-orm-entity.js', 'dist/**/entities/*.js'],

  extensions: [Migrator],

  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'migrations', // 생성 위치
    pathTs: 'migrations', // TS 사용 시
    emit: 'ts', // 마이그레이션을 TS로 생성
    glob: '!(*.d).{ts,js}',
  },

  debug: true,
});
